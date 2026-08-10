import { NextResponse } from "next/server";
import DocumentIntelligence, {
    getLongRunningPoller,
    isUnexpected,
} from "@azure-rest/ai-document-intelligence";



import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { AzureOpenAI } from "openai";
import os from "os";

/* =======================
   ENV VARIABLES
======================= */
const DI_KEY = process.env.KEY1!;
const DI_ENDPOINT = process.env.ENDPOINT1!;

const OPENAI_API_KEY = process.env.APIKEY2!;
const OPENAI_ENDPOINT = process.env.ENDPOINT2!;
const OPENAI_API_VERSION = "2024-12-01-preview";
const OPENAI_DEPLOYMENT = "gpt-5.4-mini";

/* =======================
   OPENAI CLIENT
======================= */
const openai = new AzureOpenAI({
    apiKey: OPENAI_API_KEY,
    endpoint: OPENAI_ENDPOINT,
    apiVersion: OPENAI_API_VERSION,
    deployment: OPENAI_DEPLOYMENT,
});

/* =======================
   DOCUMENT INTELLIGENCE
======================= */
async function documentProcessing(filePath: string): Promise<string> {
    const fileBuffer = fs.readFileSync(filePath);

    const diClient = DocumentIntelligence(DI_ENDPOINT, {
        key: DI_KEY,
    });

    const initialResponse = await diClient
        .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
        .post({
            contentType: "application/pdf",
            body: fileBuffer,
        });

    if (isUnexpected(initialResponse)) {
        throw new Error(initialResponse.body.error.message);
    }

    const poller = getLongRunningPoller(diClient, initialResponse);

    // 👇 FIX
    const result = await poller.pollUntilDone();

    const analyzeResult = (result as {
        body: {
            analyzeResult?: {
                content?: string;
            };
        };
    }).body.analyzeResult;

    return analyzeResult?.content ?? "";
}


// const jsonDir = path.join(process.cwd(), "generated-json");
// if (!fs.existsSync(jsonDir)) {
//     fs.mkdirSync(jsonDir)
// }


/* =======================
   GENAI PROCESSING
======================= */
async function genAIProcessing(inputText: string): Promise<any> {
const PROMPT = `
Extract the invoice into the following JSON.

IMPORTANT:
The input text below was extracted from a PDF invoice.

The PDF may contain tables and multiple columns. PDF text extraction can sometimes change the visual reading order of columns.

Therefore:
- Use the invoice's original structure, headings, labels, and column relationships to determine which value belongs to which field.
- Do NOT assume that the order of the extracted text represents the visual order of the invoice.
- Pay special attention to the invoice header, invoice details, item table, and totals section.
- Do NOT mix values between different sections.

==================================================
SUPPLIER INFORMATION
==================================================

The invoice header contains the supplier/company information.

Extract the following fields ONLY from the supplier/vendor section of the invoice:

- name
- address
- phone
- email

Look for labels such as:
- Vendor
- Vendor Address
- Supplier
- Supplier Address
- Company
- Telephone No.
- Phone
- Email

Do NOT extract supplier information from:
- Buyer
- Bill To
- Ship To
- Sold To
- Customer
- Recipient
- Delivery Address
- Customer information

If a supplier field is missing, return null.

Do NOT infer or generate missing supplier information.

==================================================
SUPPLIER AND CUSTOMER VAT NUMBERS
==================================================

The invoice may contain multiple VAT numbers.

IMPORTANT: Do NOT confuse the supplier/vendor VAT number with the customer/buyer VAT number.

Supplier VAT Number:

- Look specifically for:
  - Vendor VAT No.
  - Vendor VAT Number
  - Supplier VAT No.
  - Supplier VAT Number

- Extract this value into:
  supplierInformation.vatNumber

Customer VAT Number:

- Look specifically for:
  - AFG VAT NO.
  - Customer VAT No.
  - Customer VAT Number
  - Buyer VAT No.
  - Buyer VAT Number

- Extract this value into:
  customerVatNumber

IMPORTANT:

"AFG VAT NO." belongs to the CUSTOMER/BUYER section.

"Vendor VAT No." belongs to the SUPPLIER/VENDOR section.

For example, if the invoice contains:

AFG VAT NO.       300012765400003
Vendor VAT No.    123456789000

then return:

"supplierInformation": {
  ...
  "vatNumber": "123456789000"
},
"customerVatNumber": "300012765400003"

Do NOT put the customer VAT number into supplierInformation.vatNumber.

Do NOT put the supplier VAT number into customerVatNumber.

If either value is missing, return null.

Do NOT infer or generate VAT numbers.

==================================================
INVOICE DETAILS
==================================================

Extract these fields from the invoice details wherever they appear:

- invoiceNumber
- invoiceDate
- dueDate
- poNumber
- poDate



Look for labels such as:
- Invoice Number
- Invoice No.
- Invoice #
- Invoice Date
- Date
- Due Date
- PO Number
- PO No.
- Purchase Order Number
- Purchase Order No.
- PO Date
- Purchase Order Date

If any of these values are missing, return null.

Do NOT infer or generate missing values.

IMPORTANT:
Do not confuse:
- Invoice Number
- Vendor Number
- Vendor VAT Number
- Customer VAT Number
- Delivery Date
- Purchase Order Number

These are different fields.

==================================================
ITEMS
==================================================

Extract EVERY actual line item from the invoice item/material table.

The PDF may contain columns such as:

- Item
- Material
- SKU
- Item Material/Description
- Description
- Quantity
- Qty
- UM
- Unit Price
- Net Price
- Rate
- Net Amount
- Total
- VAT

Use the table headers and visual column relationships to determine the correct value for each field.

For every line item return:

sku:
- Extract the item/material/SKU/code if explicitly present.
- Otherwise return null.

description:
- Extract the exact item/material/description from the invoice.
- Do not invent or summarize the description.

qty:
- Extract the quantity explicitly shown in the invoice.
- Return as a NUMBER.
- Do NOT assume quantity is 1 if it is not explicitly shown.

rate:
- Extract the unit price / net price explicitly shown for that item.
- Return as a NUMBER.
- Remove currency symbols and commas.

vat:
- Extract VAT for that specific item ONLY if VAT is explicitly shown for that item.
- If VAT is only shown as an overall invoice-level value such as "VAT Total", return null for the item's vat.
- NEVER calculate or distribute VAT yourself.

total:
- Extract the item's line total / net amount if explicitly shown.
- If the line total is NOT explicitly shown, calculate qty × rate ONLY when both qty and rate are explicitly available.
- Return the result as a NUMBER.

grandTotal:

- Extract the OVERALL invoice grand total.
- Look for labels such as:
  - Grand Total
  - Invoice Total
  - Total Amount
  - Amount Due
- The same overall grand total must be repeated in EVERY item.
- If no grand total exists, return null.

==================================================
OVERALL VAT TOTAL
==================================================

Extract the OVERALL VAT/TAX amount from the invoice.

Look specifically for labels such as:

- VAT Total
- Total VAT
- VAT Amount
- Total Tax
- Tax Total
- Tax Amount

IMPORTANT:

If the invoice contains an overall value such as:

VAT Total 319.69

then extract:

"vatTotal": 319.69

The value must be returned as a NUMBER.

Do NOT calculate VAT.

Do NOT derive VAT from subtotal and grand total.

Do NOT distribute the overall VAT Total among individual items.

The overall VAT Total belongs to the top-level field:

"vatTotal"

It does NOT belong in:

items[].vat

If the invoice has an overall VAT Total, you MUST extract it.

If the invoice does not contain an overall VAT/Tax total, return:

"vatTotal": null

==================================================

If the invoice contains VAT or Tax:

- Extract it only when explicitly shown.
- Do NOT calculate VAT.
- Do NOT derive VAT from subtotal and grand total.
- Do NOT distribute an overall VAT Total among line items.

If VAT/Tax is not present in the invoice, return null for vat.

==================================================
MONETARY VALUES
==================================================

All monetary values must be returned as NUMBERS only.

Remove:
- Currency symbols
- Currency codes such as SAR, USD, INR, etc.
- Commas/thousands separators

Examples:

"$44.10" → 44.10
"$1,764.00" → 1764
"SAR 2,131.29" → 2131.29
"2,450.98" → 2450.98

Do NOT return monetary values as strings.

==================================================
DATES
==================================================

Preserve dates EXACTLY as written in the invoice.

For example:

31.07.2026

must remain:

"31.07.2026"

Do not convert the date format.

==================================================
IMPORTANT PDF RULE
==================================================

The extracted PDF text may place values from different columns next to each other.

For example, the text may appear as:

Quantity
SAR
UM
Net Price
Net Amount
2,131.29

Do NOT blindly assign values based only on text order.

Use the invoice's labels, table headings, and structure to determine which value belongs to which field.

Do NOT move values between:
- Supplier
- Buyer
- Bill To
- Ship To
- Invoice Details
- Item Table
- Totals

Do NOT infer missing information.

==================================================
OUTPUT
==================================================

Return ONLY valid JSON.

Do NOT return:
- Markdown
- \`\`\`json
- Explanations
- Comments
- Additional fields

Use null when a value is missing.

Return this JSON EXACTLY:

{
  "supplierInformation": {
    "name": null,
    "address": null,
    "phone": null,
    "email": null,
    "vatNumber": null,
    "invoiceNumber": null,
    "invoiceDate": null,
    "dueDate": null,
    "poNumber": null,
    "poDate": null
  },
  "customerVatNumber": null,
  "vatTotal": null,
  "items": [
    {
      "sku": null,
      "description": null,
      "qty": null,
      "rate": null,
      "vat": null,
      "total": null,
      "grandTotal": null
    }
  ]
}

Definitions:

- qty = quantity
- rate = unit price
- total = total/net amount for that item
- grandTotal = the OVERALL invoice grand total, repeated in every item

Invoice PDF extracted text:
${inputText}
`;

    const response = await openai.chat.completions.create({
        model: OPENAI_DEPLOYMENT,
        temperature: 0,
        max_completion_tokens: 16384,
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: PROMPT }],
    });

    const result = response.choices?.[0]?.message?.content;

    if (!result) {
        throw new Error("OpenAI returned empty content.");
    }

    const invoiceJson = JSON.parse(result);

    return invoiceJson;
    // return JSON.parse(result);
}

/* =======================
   POST API
======================= */
export async function POST(req: Request) {
    try {
        console.log("📥 POST /api/invoice called");

        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            console.error("❌ No file received");
            return NextResponse.json({ error: "No file" }, { status: 400 });
        }

        console.log("📄 File received:", file.name, file.size);

        const buffer = Buffer.from(await file.arrayBuffer());

       const tempDir = path.join(os.tmpdir(), "tmp");

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

        const filePath = path.join(tempDir, `${randomUUID()}.pdf`);
        fs.writeFileSync(filePath, buffer);

        console.log("📂 File saved to:", filePath);

        console.log("🔍 Running Document Intelligence...");
        const extractedText = await documentProcessing(filePath);

        console.log("🧠 Running OpenAI...");
        const invoiceJson = await genAIProcessing(extractedText);

        // unique file name 
        // const jsonFilePath = path.join(
        //     jsonDir,
        //     `invoice-${randomUUID()}.json`
        // )
        // fs.writeFileSync(
        //     jsonFilePath,
        //     JSON.stringify(invoiceJson, null, 2), // pretty format
        //     "utf-8"
        // );

        // console.log("📝 JSON saved to:", jsonFilePath);

        // 👀 CHECK JSON HERE
        console.log("🟢 FINAL INVOICE JSON:");
        console.dir(invoiceJson, { depth: null, color: true });

        fs.unlinkSync(filePath);

        console.log("✅ Processing complete");

        return NextResponse.json({
            success: true,
            data: invoiceJson,
        });


    } catch (error: any) {
        console.error("🔥 API ERROR:", error);
        return NextResponse.json(
            { error: error.message || "Internal error" },
            { status: 500 }
        );
    }
}

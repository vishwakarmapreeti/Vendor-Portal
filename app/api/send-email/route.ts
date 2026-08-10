import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import "isomorphic-fetch";

import { Client } from "@microsoft/microsoft-graph-client";
import { ConfidentialClientApplication } from "@azure/msal-node";

const msalClient = new ConfidentialClientApplication({
  auth: {
    clientId: process.env.AZURE_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
    clientSecret: process.env.AZURE_CLIENT_SECRET!,
  },
});

async function getAccessToken() {
  const result = await msalClient.acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });

  if (!result?.accessToken) {
    throw new Error("Unable to get access token");
  }

  return result.accessToken;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const workbook = new ExcelJS.Workbook();

    const supplierSheet = workbook.addWorksheet("Supplier");

    // --------------------------------------------------
    // Calculate subtotal from all line items
    // --------------------------------------------------
    const items = body.items || [];

    const subtotal = items.reduce((sum: number, item: any) => {
      const total =
        Number(item.total) ||
        Number(item.qty || 0) * Number(item.rate || 0);

      return sum + total;
    }, 0);

    // --------------------------------------------------
    // Excel Columns
    // --------------------------------------------------
    supplierSheet.columns = [
      {
        header: "LI-Description",
        key: "description",
        width: 30,
      },
      {
        header: "LI-Quantity",
        key: "quantity",
        width: 15,
      },
      {
        header: "LI-UnitPrice",
        key: "unitPrice",
        width: 18,
      },
      {
        header: "LI-TotalPrice",
        key: "totalPrice",
        width: 18,
      },
      {
        header: "supplier_vat_number",
        key: "supplierVatNumber",
        width: 22,
      },
      {
        header: "Document Title",
        key: "documentTitle",
        width: 22,
      },
      {
        header: "Vendor Name",
        key: "vendorName",
        width: 30,
      },
      {
        header: "Invoice No.",
        key: "invoiceNumber",
        width: 20,
      },
      {
        header: "Invoice Date",
        key: "invoiceDate",
        width: 18,
      },
      {
        header: "Customer Vat No.",
        key: "customerVatNumber",
        width: 22,
      },
      {
        header: "Vat Amount",
        key: "vatAmount",
        width: 18,
      },
      {
        header: "subtotal_amount",
        key: "subtotalAmount",
        width: 20,
      },
      {
        header: "Total Invoice Amount",
        key: "totalInvoiceAmount",
        width: 22,
      },
    ];

    // --------------------------------------------------
    // Header styling
    // --------------------------------------------------
    const headerRow = supplierSheet.getRow(1);

    headerRow.font = {
      bold: true,
    };

    headerRow.alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    headerRow.height = 25;

    // --------------------------------------------------
    // Add one Excel row for every invoice item
    // --------------------------------------------------
    items.forEach((item: any) => {
      supplierSheet.addRow({
        description: item.description ?? null,

        quantity: item.qty ?? null,

        unitPrice: item.rate ?? null,

        totalPrice:
          item.total ??
          (Number(item.qty || 0) * Number(item.rate || 0)),

        supplierVatNumber:
          body.supplierInformation?.vatNumber ?? null,

        documentTitle:
          body.documentTitle ?? "Purchase order",

        vendorName:
          body.supplierInformation?.name ?? null,

        invoiceNumber:
          body.supplierInformation?.invoiceNumber ?? null,

        invoiceDate:
          body.supplierInformation?.invoiceDate ?? null,

        customerVatNumber:
          body.customerVatNumber ?? null,

        vatAmount:
          body.vatTotal ?? null,

        subtotalAmount:
          subtotal,

        totalInvoiceAmount:
          item.grandTotal ?? null,
      });
    });

    // --------------------------------------------------
    // Format monetary columns
    // --------------------------------------------------
    supplierSheet.getColumn("unitPrice").numFmt = "#,##0.00";
    supplierSheet.getColumn("totalPrice").numFmt = "#,##0.00";
    supplierSheet.getColumn("vatAmount").numFmt = "#,##0.00";
    supplierSheet.getColumn("subtotalAmount").numFmt = "#,##0.00";
    supplierSheet.getColumn("totalInvoiceAmount").numFmt = "#,##0.00";

    // --------------------------------------------------
    // IMPORTANT:
    // VAT numbers and invoice numbers should be TEXT
    // so Excel doesn't convert them to scientific notation.
    // --------------------------------------------------
    supplierSheet.getColumn("supplierVatNumber").numFmt = "@";
    supplierSheet.getColumn("customerVatNumber").numFmt = "@";
    supplierSheet.getColumn("invoiceNumber").numFmt = "@";

    // --------------------------------------------------
    // Align numeric columns
    // --------------------------------------------------
    supplierSheet.getColumn("quantity").alignment = {
      horizontal: "right",
    };

    supplierSheet.getColumn("unitPrice").alignment = {
      horizontal: "right",
    };

    supplierSheet.getColumn("totalPrice").alignment = {
      horizontal: "right",
    };

    supplierSheet.getColumn("vatAmount").alignment = {
      horizontal: "right",
    };

    supplierSheet.getColumn("subtotalAmount").alignment = {
      horizontal: "right",
    };

    supplierSheet.getColumn("totalInvoiceAmount").alignment = {
      horizontal: "right",
    };

    // --------------------------------------------------
    // Generate Excel file
    // --------------------------------------------------
    const buffer = await workbook.xlsx.writeBuffer();

    // --------------------------------------------------
    // Microsoft Graph authentication
    // --------------------------------------------------
    const token = await getAccessToken();

    const client = Client.init({
      authProvider: (done) => {
        done(null, token);
      },
    });

    // --------------------------------------------------
    // Send Email
    // --------------------------------------------------
    await client
      .api(`/users/${process.env.MAIL_SENDER}/sendMail`)
      .post({
        message: {
          subject: "Supplier Invoice",

          body: {
            contentType: "Text",
            content: "Please find the attached supplier invoice.",
          },

          toRecipients: [
            {
              emailAddress: {
                address: "parvez.khan@ixorainnovation.com",
              },
            },
          ],

          attachments: [
            {
              "@odata.type": "#microsoft.graph.fileAttachment",

              name: "SupplierInvoice.xlsx",

              contentType:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

              contentBytes:
                Buffer.from(buffer).toString("base64"),
            },
          ],
        },

        saveToSentItems: true,
      });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}
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

    supplierSheet.columns = [
      { header: "Name", key: "name", width: 30 },
      { header: "Invoice No", key: "invoiceNumber", width: 20 },
      { header: "Invoice Date", key: "invoiceDate", width: 18 },
      { header: "Due Date", key: "dueDate", width: 18 },
      { header: "PO Number", key: "poNumber", width: 18 },
      { header: "Phone", key: "phone", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Address", key: "address", width: 50 },
    ];

    supplierSheet.addRow({
      name: body.supplierInformation?.name,
      invoiceNumber: body.supplierInformation?.invoiceNumber,
      invoiceDate: body.supplierInformation?.invoiceDate,
      dueDate: body.supplierInformation?.dueDate,
      poNumber: body.supplierInformation?.poNumber,
      phone: body.supplierInformation?.phone,
      email: body.supplierInformation?.email,
      address: body.supplierInformation?.address,
    });

    const buffer = await workbook.xlsx.writeBuffer();

    const token = await getAccessToken();

    const client = Client.init({
      authProvider: (done) => {
        done(null, token);
      },
    });

    await client.api(`/users/${process.env.MAIL_SENDER}/sendMail`).post({
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
            contentBytes: Buffer.from(buffer).toString("base64"),
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
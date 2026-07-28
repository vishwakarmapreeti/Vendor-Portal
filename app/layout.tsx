import type { Metadata } from "next";
import "./globals.css";

import NextTopLoader from "nextjs-toploader";
import { LoaderProvider } from "@/components/LoaderProvider";
import "bootstrap/dist/css/bootstrap.min.css";
export const metadata: Metadata = {
  title: "DBMSC | Supplier Portal",
  description: "DBMSC Steel Supplier & Vendor Portal — SAP-integrated procurement, invoicing and onboarding.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans"> <LoaderProvider>
         
      {children}
      </LoaderProvider>
        
      </body>
    </html>
  );
}

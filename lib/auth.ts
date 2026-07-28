// lib/auth.ts
//
// DEMO-ONLY dummy authentication.
// Replace with a real call to your SAP-connected auth service
// (e.g. SAP Cloud Identity / SSO) before going to production.

export type Vendor = {
  vendorId: string;
  companyName: string;
  email: string;
  password: string; // plain text ONLY because this is dummy/demo data
  contactName: string;
};

export const DUMMY_VENDORS: Vendor[] = [
  {
    vendorId: "V-004821",
    companyName: "Al Rashid Steel Trading LLC",

    email: "preeti.v@ixorainnovation.com",
    password: "Info@1234",
    contactName: "Ahmed Al Rashid",
  },
  {
    vendorId: "V-005112",
    companyName: "Gulf Tubular Industries",
    email: "parvez.khan@ixorainnovation.com",
    password: "Info@1234",
    contactName: "Fatima Noor",
  },
  {
    vendorId: "V-005390",
    companyName: "Emirates Stainless Co.",
    email: "finance@emiratesstainless.ae",
    password: "Info@1234",
    contactName: "Rakesh Menon",
  },
];

export type LoginResult =
  | { success: true; vendor: Vendor }
  | { success: false; message: string };

/**
 * Simulates a network call to an auth endpoint.
 * Swap this out for a real fetch() to your SAP-connected identity provider.
 */
export async function loginWithDummyData(
  email: string,
  password: string
): Promise<LoginResult> {
  // simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 900));

  const vendor = DUMMY_VENDORS.find(
    (v) => v.email.toLowerCase() === email.trim().toLowerCase()
  );

  if (!vendor) {
    return { success: false, message: "No vendor account found for this email." };
  }
  if (vendor.password !== password) {
    return { success: false, message: "Incorrect password. Please try again." };
  }
  return { success: true, vendor };
}
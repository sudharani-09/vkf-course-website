const FALLBACK_NUMBER = "919623252626";

export function getWhatsAppNumber(): string {
  return FALLBACK_NUMBER;
}

export function buildWhatsAppUrl(message: string, number?: string): string {
  const n = number || FALLBACK_NUMBER;
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`;
}

export function buildEnrollmentMessage(data: {
  name: string;
  email: string;
  phone: string;
  address: string;
  experience: string;
  planLabel: string;
  planPrice: string;
}): string {
  return [
    "Hello, I would like to enroll in the Wedding Film Course.",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Address: ${data.address}`,
    `Experience Level: ${data.experience}`,
    `Selected Plan: ${data.planLabel} (${data.planPrice})`,
    "",
    "Please share payment details and next steps.",
  ].join("\n");
}

export function buildWhatsAppUrlFromCms(message: string, whatsappNumber: string): string {
  return buildWhatsAppUrl(message, whatsappNumber.replace(/\D/g, ""));
}

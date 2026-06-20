import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "vkf_admin_session";

function hashToken(password: string): string {
  return createHash("sha256").update(`vkf-admin:${password}`).digest("hex");
}

export function getExpectedAdminToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return hashToken(password);
}

export function verifyAdminPassword(password: string): boolean {
  const expected = getExpectedAdminToken();
  if (!expected) return false;
  const attempt = hashToken(password);
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(attempt));
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const expected = getExpectedAdminToken();
  if (!expected) return false;
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(token));
  } catch {
    return false;
  }
}

export { COOKIE_NAME };

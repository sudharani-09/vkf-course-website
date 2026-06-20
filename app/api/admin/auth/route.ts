import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, getExpectedAdminToken, verifyAdminPassword } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }
    const token = getExpectedAdminToken();
    if (!token) {
      return NextResponse.json({ error: "ADMIN_PASSWORD not set on server" }, { status: 500 });
    }
    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}

export async function GET() {
  const { isAdminAuthenticated } = await import("@/lib/admin-auth");
  return NextResponse.json({ authenticated: await isAdminAuthenticated() });
}

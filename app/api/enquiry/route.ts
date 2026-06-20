import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { error } = await getSupabase().from("enquiries").insert([{
      name: body.name,
      phone: body.phone,
      email: body.email,
      message: body.enquiry,
      created_at: new Date().toISOString(),
    }]);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { error } = await getSupabase().from("enrollments").insert([{
      name: body.name,
      phone: body.phone,
      email: body.email,
      address: body.address,
      experience_level: body.experience,
      selected_plan: body.plan,
      amount: body.amount,
      payment_status: body.payment_status,
      payment_id: body.payment_id,
      created_at: new Date().toISOString(),
    }]);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Supabase error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await getSupabase()
      .from("batch_info")
      .select("*")
      .eq("is_active", true)
      .order("batch_date", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ batch: data });
  } catch {
    return NextResponse.json({ batch: null });
  }
}

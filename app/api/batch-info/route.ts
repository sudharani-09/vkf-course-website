import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await getSupabase()
  .from("batch_info")
  .select("*")
  .limit(1)
  .maybeSingle();

console.log("BATCH DATA:", data);
console.log("BATCH ERROR:", error);

if (error) {
  return NextResponse.json({ error: error.message });
}

return NextResponse.json({ batch: data });
  } catch {
    return NextResponse.json({ batch: null });
  }
}

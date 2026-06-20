import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const db = getSupabase();
    const [enquiries, enrollments, batch] = await Promise.all([
      db.from("enquiries").select("id", { count: "exact", head: true }),
      db.from("enrollments").select("id", { count: "exact", head: true }),
      db.from("batch_info").select("batch_name, batch_date").eq("is_active", true).maybeSingle(),
    ]);
    return NextResponse.json({
      enquiries: enquiries.count ?? 0,
      enrollments: enrollments.count ?? 0,
      batch: batch.data,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load overview";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

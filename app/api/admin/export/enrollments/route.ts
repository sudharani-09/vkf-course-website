import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data, error } = await getSupabase()
      .from("enrollments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    const rows = data ?? [];
    const headers = ["Name", "Phone", "Email", "Address", "Experience", "Plan", "Amount", "Status", "Date"];
    const csvRows = [
      headers.join(","),
      ...rows.map((r) =>
        [
          r.name,
          r.phone,
          r.email,
          r.address,
          r.experience_level,
          r.selected_plan,
          r.amount,
          r.payment_status,
          r.created_at,
        ]
          .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
          .join(",")
      ),
    ];

    return new NextResponse(csvRows.join("\n"), {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="enrollments-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Export failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

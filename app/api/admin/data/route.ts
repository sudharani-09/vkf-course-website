import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { ADMIN_TABLES, type AdminTable } from "@/lib/cms";
import { getSupabase } from "@/lib/supabase";

const TABLE_MAP: Record<string, AdminTable> = Object.fromEntries(
  ADMIN_TABLES.map((t) => [t, t])
);

async function guard() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const table = req.nextUrl.searchParams.get("table") as AdminTable;
  if (!table || !TABLE_MAP[table]) {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 });
  }

  try {
    const db = getSupabase();
    let query = db.from(table).select("*");

    if (table === "batch_info") query = query.order("batch_date", { ascending: false });
    else if (table === "enquiries" || table === "enrollments") query = query.order("created_at", { ascending: false });
    else if (table !== "site_settings") query = query.order("sort_order");

    const { data, error } = await query;
    if (error) throw error;

    if (table === "site_settings" && Array.isArray(data)) {
      const obj: Record<string, string> = {};
      for (const row of data) obj[row.key] = row.value;
      return NextResponse.json({ data: obj });
    }

    return NextResponse.json({ data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Fetch failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const body = await req.json();
  const table = body.table as AdminTable;
  const row = body.row;

  if (!table || !TABLE_MAP[table] || !row) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const db = getSupabase();

    if (table === "site_settings") {
      const entries = Object.entries(row as Record<string, string>);
      for (const [key, value] of entries) {
        const { error } = await db.from("site_settings").upsert({ key, value: String(value) });
        if (error) throw error;
      }
      return NextResponse.json({ success: true });
    }

    const { data, error } = await db.from(table).insert([row]).select().single();
    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Create failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const body = await req.json();
  const table = body.table as AdminTable;
  const row = body.row;
  const id = body.id as string;

  if (!table || !TABLE_MAP[table] || !row) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const db = getSupabase();

    if (table === "site_settings") {
      const entries = Object.entries(row as Record<string, string>);
      for (const [key, value] of entries) {
        const { error } = await db.from("site_settings").upsert({ key, value: String(value) });
        if (error) throw error;
      }
      return NextResponse.json({ success: true });
    }

    const updateRow = { ...row };
    delete updateRow.id;

    const { data, error } = await db.from(table).update(updateRow).eq("id", id).select().single();
    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const table = req.nextUrl.searchParams.get("table") as AdminTable;
  const id = req.nextUrl.searchParams.get("id");

  if (!table || !TABLE_MAP[table] || !id) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const { error } = await getSupabase().from(table).delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

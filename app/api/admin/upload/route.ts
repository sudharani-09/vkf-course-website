import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getStoragePublicUrl, getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const maxSize = file.type.startsWith("video/") ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const path = `${folder}/${safeName}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await getSupabase().storage.from("site-assets").upload(path, buffer, {
      contentType: file.type,
      upsert: true,
    });

    if (error) throw error;

    const url = getStoragePublicUrl(path);
    return NextResponse.json({ url, path });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

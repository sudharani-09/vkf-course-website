import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabase, getStoragePublicUrl } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { folder, filename, contentType } = await req.json();
    if (!folder || !filename) {
      return NextResponse.json({ error: "Missing folder or filename" }, { status: 400 });
    }

    const ext = filename.split(".").pop()?.toLowerCase() || "bin";
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const path = `${folder}/${safeName}`;

    const { data, error } = await getSupabase()
      .storage
      .from("site-assets")
      .createSignedUploadUrl(path);

    if (error) throw error;

    const publicUrl = getStoragePublicUrl(path);
    return NextResponse.json({ signedUrl: data.signedUrl, path, publicUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to generate upload URL";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

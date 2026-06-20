import { isExternalMediaUrl } from "@/lib/cms";

export function mediaSrc(url: string): string {
  return url || "";
}

export function isRemoteMedia(url: string): boolean {
  return isExternalMediaUrl(url);
}

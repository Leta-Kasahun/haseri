import { env } from "@/src/config";

export const resolveAssetUrl = (src?: string | null) => {
  if (!src) return null;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;

  // Derive origin from API_BASE_URL if BACKEND_ORIGIN is missing
  let origin = env.BACKEND_ORIGIN;
  if (!origin && env.API_BASE_URL) {
    try {
      const url = new URL(env.API_BASE_URL);
      origin = `${url.protocol}//${url.host}`;
    } catch {
      origin = "";
    }
  }

  // Clean the path: remove "server/" if present and normalize slashes
  let cleanSrc = src.replace(/^server\//, "").replace(/\\/g, "/");
  
  // Ensure it starts with "storage/" if it's a relative path from our uploads
  // This handles cases where the DB might only store "uploads/ids/..." or "ids/..."
  if (!cleanSrc.startsWith("storage/") && !cleanSrc.startsWith("/storage/")) {
    if (cleanSrc.startsWith("uploads/")) {
      cleanSrc = "storage/" + cleanSrc;
    } else if (cleanSrc.startsWith("/")) {
      cleanSrc = "storage" + cleanSrc;
    } else {
      // If it's a raw path like "ids/filename.jpg"
      cleanSrc = "storage/uploads/" + cleanSrc;
    }
  }

  // Ensure no leading slash for the relative part
  if (cleanSrc.startsWith("/")) cleanSrc = cleanSrc.substring(1);

  if (!origin) return `/${cleanSrc}`;
  return `${origin}/${cleanSrc}`;
};

import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  image: z.url().refine(async (image) => {
    try {
      const res = await fetch(image, { method: "HEAD" });
      if (!res.ok) return false;
      return res.headers.get("content-type")?.startsWith("image/") === true;
    } catch {
      return false;
    }
  }, "Invalid image URL"),
  pitch: z.string().min(10),
});

import { z } from "zod";

// image schema
export const imageSchema = z.object({
    public_id: z.string().trim(),
    url: z.string().trim(),
});

// category schema
export const categorySchema = z.object({
    name: z.string().trim(),
    image: imageSchema,
});

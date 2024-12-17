import mongoose from "mongoose";
import { z } from "zod";

// image schema
export const imageSchema = z.object({
    public_id: z.string().trim(),
    url: z.string().url().trim(),
});

// category schema
export const categorySchema = z.object({
    name: z.string().trim(),
    image: imageSchema,
});

// product schema
export const productSchema = z.object({
    name: z.string().trim(),
    images: z.array(imageSchema),
    price: z.number(),
    discountPrice: z.number(),
    quantity: z.number(),
    category: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid category ID",
    }),
});

// branch schema
export const branchSchema = z.object({
    name: z.string().trim(),
    location: z.object({
        latitude: z.number(),
        longitude: z.number(),
    }),
    address: z.string(),
    deliveryPartners: z
        .string()
        .refine((val) => mongoose.Types.ObjectId.isValid(val), {
            message: "Invalid Delivery Partner ID",
        }),
});

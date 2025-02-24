import mongoose from "mongoose";
import { string, z } from "zod";

// image schema
const imageSchema = z.object({
    public_id: z.string().nonempty("public_id is required"), // Ensures it's a non-empty string
    url: z.string().url("Invalid URL format").nonempty("URL is required"), // Ensures it's a valid URL
});

// category schema
export const categorySchema = z.object({
    name: z.string().trim(),
    description: z.string().trim(),
    image: z.string().optional(),
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
    deliveryPartners: z.array(
        string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
            message: "Invalid Delivery Partner ID",
        })
    ),
});

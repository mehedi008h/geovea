import mongoose from "mongoose";
import { z } from "zod";

export const orderSchema = z.object({
    totalPrice: z.number(),
    items: z.array(
        z.object({
            id: z.string().trim(),
            item: z.string().trim(),
            count: z.number(),
        })
    ),
    branch: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid branch ID",
    }),
});

export const locationSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
    address: z.string(),
});

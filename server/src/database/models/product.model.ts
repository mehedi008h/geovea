import mongoose, { Document, Schema, Types } from "mongoose";

export interface ProductDocument extends Document {
    name: string;
    image: string;
    price: number;
    discountPrice: number;
    quantity: string;
    category: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

// product model
const productSchema = new Schema<ProductDocument>(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        discountPrice: { type: Number },
        quantity: { type: String, required: true },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
        toJSON: {},
    }
);

export const Product = mongoose.model<ProductDocument>(
    "Product",
    productSchema
);

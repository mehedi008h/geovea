import mongoose, { Document, Schema } from "mongoose";

export interface CategoryDocument extends Document {
    name: string;
    image: {
        public_id: string;
        url: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

// category model
const categorySchema = new Schema<CategoryDocument>(
    {
        name: { type: String, required: true, unique: true },
        image: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
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

export const Category = mongoose.model<CategoryDocument>(
    "Category",
    categorySchema
);

import mongoose, { Document, Schema } from "mongoose";

export interface CounterDocument extends Document {
    name: string;
    sequence_value: number;
    createdAt: Date;
    updatedAt: Date;
}

// counter model
const counterSchema = new Schema<CounterDocument>(
    {
        name: { type: String, required: true, unique: true },
        sequence_value: { type: Number, default: 0 },
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

export const Counter = mongoose.model<CounterDocument>(
    "Counter",
    counterSchema
);

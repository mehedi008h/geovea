import mongoose, { Document, Schema } from "mongoose";

export interface BranchDocument extends Document {
    name: string;
    location: {
        latitude: number;
        longitude: number;
    };
    address: string;
    deliveryPartners: string[];
    createdAt: Date;
    updatedAt: Date;
}

// branch model
const branchSchema = new Schema<BranchDocument>(
    {
        name: { type: String, require: true },
        location: {
            latitude: { type: Number },
            longitude: { type: Number },
        },
        address: { type: String },
        deliveryPartners: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "DeliveryPartner",
            },
        ],
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

export const Branch = mongoose.model<BranchDocument>("Branch", branchSchema);

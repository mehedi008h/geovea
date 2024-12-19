import mongoose, { Document, Schema, Types } from "mongoose";
import { Counter } from "./counter.model";
import { string } from "zod";

interface ILocation {
    latitude: number;
    longitude: number;
    address?: string;
}

interface IItem {
    id: Types.ObjectId;
    item: Types.ObjectId;
    count: number;
}

export interface OrderDocument extends Document {
    orderId: string;
    customer: Types.ObjectId;
    deliveryPartner: Types.ObjectId;
    branch: Types.ObjectId;
    items: IItem[];
    deliveryLocation: ILocation;
    pickupLocation: ILocation;
    deliveryPersonLocation: ILocation;
    status: "avaliable" | "confirmed" | "arriving" | "delivered" | "cancelled";
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
}

// order model
const orderSchema = new Schema<OrderDocument>(
    {
        orderId: {
            type: String,
            unique: true,
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },
        deliveryPartner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DeliveryPartner",
        },
        branch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            required: true,
        },
        items: [
            {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                item: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                count: { type: Number, required: true },
            },
        ],
        deliveryLocation: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true },
            address: { type: String },
        },
        pickupLocation: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true },
            address: { type: String },
        },
        deliveryPersonLocation: {
            latitude: { type: Number },
            longitude: { type: Number },
            address: { type: String },
        },
        status: {
            type: String,
            enum: [
                "avaliable",
                "confirmed",
                "arriving",
                "delivered",
                "cancelled",
            ],
            default: "avaliable",
        },
        totalPrice: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
        toJSON: {},
    }
);

// Function to get the next sequence value
async function getNextSequenceValue(sequenceName: string): Promise<number> {
    try {
        const sequenceDocument = await Counter.findOneAndUpdate(
            { name: sequenceName },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        ).exec();

        if (!sequenceDocument) {
            throw new Error(
                `Failed to retrieve or create sequence document for ${sequenceName}`
            );
        }

        return sequenceDocument.sequence_value;
    } catch (error) {
        console.error("Error in getNextSequenceValue:", error);
        throw error;
    }
}

// Pre-save middleware to generate orderId
orderSchema.pre("save", async function (next) {
    if (this.isNew) {
        const sequenceValue = await getNextSequenceValue("orderId");
        this.orderId = `ORDER${sequenceValue.toString().padStart(5, "0")}`;
    }
    next();
});

export const Order = mongoose.model<OrderDocument>("Order", orderSchema);

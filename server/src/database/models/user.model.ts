import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    liveLocation: {
        latitude: number;
        longitude: number;
    };
    address: string;

    isActivated: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// user model
const userSchema = new Schema<UserDocument>(
    {
        name: { type: String },
        role: {
            type: String,
            enum: ["Customer", "Admin", "DeliveryPartner"],
            required: true,
        },
        isActivated: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        toJSON: {},
    }
);

// customer model
const customerSchema = new Schema<UserDocument>(
    {
        ...userSchema.obj,
        phone: { type: String, required: true },
        role: {
            type: String,
            enum: ["Customer"],
            default: "Customer",
        },
        liveLocation: {
            latitude: { type: Number },
            longitude: { type: Number },
        },
        address: { type: String },
    },
    {
        timestamps: true,
        toJSON: {},
    }
);

// delivery partner model
const deliveryPartnerSchema = new Schema<UserDocument>(
    {
        ...userSchema.obj,
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String, required: true },
        role: {
            type: String,
            enum: ["DeliveryPartner"],
            default: "DeliveryPartner",
        },
        liveLocation: {
            latitude: { type: Number },
            longitude: { type: Number },
        },
        address: { type: String },
    },
    {
        timestamps: true,
        toJSON: {},
    }
);

// delivery partner model
const adminSchema = new Schema<UserDocument>(
    {
        ...userSchema.obj,
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["Admin"],
            default: "Admin",
        },
    },
    {
        timestamps: true,
        toJSON: {},
    }
);

export const Customer = mongoose.model<UserDocument>(
    "Customer",
    customerSchema
);
export const DeliveryPartner = mongoose.model<UserDocument>(
    "DeliveryPartner",
    deliveryPartnerSchema
);
export const Admin = mongoose.model<UserDocument>("Admin", adminSchema);

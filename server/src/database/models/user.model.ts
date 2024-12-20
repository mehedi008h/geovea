import mongoose, { Document, Schema, Types } from "mongoose";
import { compareValue, hashValue } from "../../common/utils/bcrypt";

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    image: {
        public_id: string;
        url: string;
    };
    role: string;
    liveLocation: {
        latitude: number;
        longitude: number;
    };
    address: string;
    branch: Types.ObjectId;
    isActivated: boolean;
    comparePassword(value: string): Promise<boolean>;
    createdAt: Date;
    updatedAt: Date;
}

// user model
const userSchema = new Schema<UserDocument>(
    {
        name: { type: String },
        image: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            },
        },
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
        branch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
        },
        address: { type: String },
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

// delivery partner
deliveryPartnerSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await hashValue(this.password);
    }
    next();
});

deliveryPartnerSchema.methods.comparePassword = async function (value: string) {
    return compareValue(value, this.password);
};

export const Customer = mongoose.model<UserDocument>(
    "Customer",
    customerSchema
);
export const DeliveryPartner = mongoose.model<UserDocument>(
    "DeliveryPartner",
    deliveryPartnerSchema
);
export const Admin = mongoose.model<UserDocument>("Admin", adminSchema);

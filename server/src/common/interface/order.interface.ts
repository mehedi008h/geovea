import { Types } from "mongoose";

interface IItem {
    id: string;
    item: string;
    count: number;
}

export interface OrderDto {
    items: IItem[];
    branch: string;
    totalPrice: number;
}

export interface DeliveryPersonLocation {
    latitude: number;
    longitude: number;
    address: string;
}

export interface Query {
    status?: string;
    deliveryPartner?: Types.ObjectId;
    branch?: Types.ObjectId;
    customer?: Types.ObjectId;
}

export interface QueryData {
    status?: string;
    deliveryPartnerId?: Types.ObjectId;
    branchId?: Types.ObjectId;
    customerId?: Types.ObjectId;
}

export interface OrderStatusDTO {
    status: "avaliable" | "confirmed" | "arriving" | "delivered" | "cancelled";
    deliveryPersonLocation: DeliveryPersonLocation;
}

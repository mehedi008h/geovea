import { Types } from "mongoose";

export interface Image {
    public_id: string;
    url: string;
}

// category
export interface CategoryDto {
    name: string;
    image: Image;
}

// product
export interface ProductDto {
    name: string;
    images: Image[];
    price: number;
    discountPrice: number;
    quantity: number;
    category: string;
}

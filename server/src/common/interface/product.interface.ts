export interface Image {
    public_id: string;
    url: string;
}

// category
export interface CategoryDto {
    name: string;
    description: string;
    image?: string;
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

// branch
export interface BranchDto {
    name: string;
    location: {
        latitude: number;
        longitude: number;
    };
    address: string;
    deliveryPartners: string[];
}

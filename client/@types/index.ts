export interface Product {
    _id: string;
    name: string;
    description: string;
    images: string[];
    price: string;
    discountPrice: string;
    quantity: string;
    category: string;
    stock: string;
}

export interface CategoryI {
    _id: string;
    name: string;
    description: string;
    image: string;
}

export interface Branch {
    _id: string;
    name: string;
    address: string;
}

export interface DeliveryPartnerI {
    _id: string;
    slug: string;
    image: string;
    name: string;
    email: string;
    phone: string;
    password: string;
}

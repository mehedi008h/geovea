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

export interface Category {
    _id: string;
    name: string;
    image: string;
}

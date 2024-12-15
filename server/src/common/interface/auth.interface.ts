export interface CustomerLoginDto {
    phone: string;
}

export interface DeliveryPartnerLoginDto {
    email: string;
    password: string;
}

export interface FetchUserDto {
    userId: string;
    role: string;
}

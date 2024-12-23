export interface CustomerLoginDto {
    phone: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto extends LoginDto {
    phone: string;
}

export interface FetchUserDto {
    userId: string;
    role: string;
}

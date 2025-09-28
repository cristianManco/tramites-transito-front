export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    name: string;
    email: string;
    password: string;
    role?: string;
}

export interface AuthResponse {
    access_token: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
}

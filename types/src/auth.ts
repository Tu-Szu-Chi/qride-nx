export interface SignupPayload {
    phone: string;
    password: string;
    email?: string;
}

export interface LoginPayload {
    phone: string;
    password: string;
}
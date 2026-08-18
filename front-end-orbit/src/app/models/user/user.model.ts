export enum UserTheme {
    LIGHT = 'light',
    DARK = 'dark',
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}
export interface LoginData {
    email: string;
    password: string;
}

export interface ForgetData {
    email: string;
}

export interface NewUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: UserRole;
    theme?: UserTheme;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    theme: UserTheme;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export enum UserTheme {
    LIGHT = 'light',
    DARK = 'dark',
}

export enum UserRole {
    ADMIN = 'ADMIN',
    BASIC = 'BASIC',
}

export function isAdminRole(role: string | UserRole | null | undefined): boolean {
    return String(role ?? '').toUpperCase() === UserRole.ADMIN;
}

export function fromApiTheme(theme: unknown): UserTheme {
    return String(theme ?? '').toLowerCase() === 'dark' ? UserTheme.DARK : UserTheme.LIGHT;
}

export function toApiTheme(theme: string): 'LIGHT' | 'DARK' {
    return String(theme).toUpperCase() === 'DARK' ? 'DARK' : 'LIGHT';
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

export interface UpdateUserData {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    theme?: 'LIGHT' | 'DARK';
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
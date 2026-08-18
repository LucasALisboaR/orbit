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
    role?: string | 'admin' | 'user';
    theme?: string | 'light' | 'dark';
}
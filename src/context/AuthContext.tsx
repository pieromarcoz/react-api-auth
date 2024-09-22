import React, { createContext, useState, useCallback } from 'react';
import {login, register} from '../services/api';

type AuthContextType = {
    isLoginForm: boolean;
    toggleForm: (isLogin: boolean) => void;
    register: (data: { name: string; email: string; password: string }) => Promise<void>;
    login: (data: { email: string; password: string }) => Promise<void>;
    error: string | null;
    response: unknown | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState(null);

    const toggleForm = useCallback((isLogin: boolean) => {
        setIsLoginForm(isLogin);
        setError(null);
    }, []);

    const registerUser = useCallback(async (data: { name: string; email: string; password: string }) => {
        try {
            const res = await register(data);
            setResponse(res);
            // Handle successful registration (e.g., show success message, redirect, etc.)
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    }, []);

    const loginUser = useCallback(async (data: { email: string; password: string }) => {
        try {
            const res =await login(data);
            setResponse(res);
            // Handle successful login (e.g., show success message, redirect, etc.)
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoginForm, toggleForm, register: registerUser, error, login: loginUser, response }}>
            {children}
        </AuthContext.Provider>
    );
};
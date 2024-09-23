import React, { createContext, useState } from 'react';
import {login, register} from '../services/api';

type AuthContextType = {
    isLoginForm: boolean;
    toggleForm: (isLogin: boolean) => void;
    register: (data: { name: string; email: string; password: string }) => Promise<void>;
    login: (data: { email: string; password: string }) => Promise<void>;
    error: string | null;
    response: unknown | null;
};

// Create a context object
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState(null);

    // Toggle the login form
    const toggleForm = ((isLogin: boolean) => {
        setIsLoginForm(isLogin);
        setError(null);
    });

    // Register and login functions
    const registerUser = (async (data: { name: string; email: string; password: string }) => {
        try {
            const res = await register(data);
            setResponse(res);
            // Handle successful registration (e.g., show success message, redirect, etc.)
        } catch (err) {
            // console.log(err);
            setError('Registration failed. Please try again.');
        }
    });
    
    const loginUser = (async (data: { email: string; password: string }) => {
        try {
            const res =await login(data);
            setResponse(res);
            // Handle successful login (e.g., show success message, redirect, etc.)
        } catch (err) {
            // console.log(err);
            setError('Login failed. Please try again.');
        }
    });

    return (
        <AuthContext.Provider value={{ isLoginForm, toggleForm, register: registerUser, error, login: loginUser, response }}>
            {children}
        </AuthContext.Provider>
    );
};
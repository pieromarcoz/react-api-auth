import React from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginForm from './LoginForm.tsx';
import RegisterForm from './RegisterForm.tsx';

const AuthForm: React.FC = () => {
    const { isLoginForm, toggleForm } = useAuth();

    return (
        <>
            {isLoginForm ? <LoginForm /> : <RegisterForm />}
            <div className="flex gap-3">
                <button
                    className="minimalist bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => toggleForm(true)}
                >
                    Login
                </button>
                <button
                    className="minimalist bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => toggleForm(false)}
                >
                    Register
                </button>
            </div>
        </>
    );
};

export default AuthForm;
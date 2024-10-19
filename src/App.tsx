import { useEffect, useState} from "react";
import LoginForm from "./components/LoginForm.tsx";
import RegisterForm from "./components/RegisterForm.tsx";
import ResponseDisplay from "./components/ResponseDisplay.tsx";
import {useAuth} from "./hooks/useAuth.ts";
import Loading from "./components/Loading.tsx";
import FirstLoading from "./components/FirstLoading.tsx";

function App() {
    const [changeForm, setChangeForm] = useState<boolean>(false)
    const { response, isLoading, clearResponse } = useAuth();
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
        const minLoadTime = 2000; // Tiempo mínimo de carga en milisegundos
        const startTime = Date.now();

        const handleLoad = () => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minLoadTime - elapsedTime);

            setTimeout(() => {
                setIsInitialLoading(false);
            }, remainingTime);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, []);

    const handleFormReset = (isRegister: boolean) => {
        setChangeForm(isRegister);
        clearResponse();
    }

    if (isInitialLoading) {
        return <FirstLoading isLoading={isInitialLoading} />;
    }

    return (
        <main className={'flex flex-col justify-center min-h-screen bg-gray-100'}>
            <header className="text-center mb-10">
                <h1 className={'text-3xl font-bold mx-auto'}>Authentication Service</h1>
                <p className="text-sm text-gray-500 mt-1">Powered by Laravel & React</p>
            </header>
            <div className={'max-w-2xl w-full mx-auto bg-white py-12 px-5 rounded-lg shadow-md flex flex-col items-center gap-7'}>
                {changeForm ? <RegisterForm/> : <LoginForm/>}
                <div className={'flex gap-3'}>
                    <button
                        className={'minimalist bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'}
                        onClick={() => handleFormReset(false)}
                    >
                        Login
                    </button>
                    <button
                        className={'minimalist bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'}
                        onClick={() => handleFormReset(true)}
                    >
                        Register
                    </button>
                </div>
                {isLoading ? <Loading/> : <ResponseDisplay response={response}/>}
            </div>
        </main>
    );
}

export default App;
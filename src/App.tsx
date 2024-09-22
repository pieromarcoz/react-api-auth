import {useState} from "react";

import LoginForm from "./components/LoginForm.tsx";
import RegisterForm from "./components/RegisterForm.tsx";
import ResponseDisplay from "./components/ResponseDisplay.tsx";
import {useAuth} from "./hooks/useAuth.ts";

function App() {
    const [changeForm, setChangeForm] = useState(false)
    const { response } = useAuth();

    return (
        <main className={'flex flex-col justify-center min-h-screen bg-gray-100'}>
            <header className="text-center mb-10">
                <h1 className={'text-3xl font-bold mx-auto'}>Authentication Service</h1>
                <p className="text-sm text-gray-500 mt-1">Powered by Laravel & React</p>
            </header>
            <div
                className={'max-w-2xl w-full mx-auto bg-white py-12 px-5 rounded-lg shadow-md flex flex-col items-center gap-7'}>
                {
                    changeForm ? <RegisterForm/> : <LoginForm/>
                }
                <div className={'flex gap-3'}>
                    <button
                        className={'minimalist bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'}
                        onClick={() => setChangeForm(false)}>Login
                    </button>
                    <button
                        className={'minimalist bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'}
                        onClick={() => setChangeForm(true)}>Register
                    </button>
                </div>
                <ResponseDisplay response={response}/>
            </div>
        </main>
    )
}

export default App
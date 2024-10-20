import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AuthProvider} from "./context/AuthContext.tsx";
import { Analytics} from "@vercel/analytics/react";

createRoot(document.getElementById('root')!).render(
<AuthProvider>
    <App />
    <Analytics/>
</AuthProvider>
)

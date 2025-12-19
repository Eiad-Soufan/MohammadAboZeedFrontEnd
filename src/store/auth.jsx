// src/store/auth.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { AuthAPI } from "../lib/api";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);     // يمكنك تخزين username/email فقط
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // اختيارياً: حاول جلب /me إن أردت endpoint لذلك
        setReady(true);
    }, []);

    const login = async (username, password) => {
        const resp = await AuthAPI.login(username, password);
        const { access, refresh } = resp.data;
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        setUser({ username }); // مبدئيًا
        return true;
    };

    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUser(null);
    };

    return (
        <AuthCtx.Provider value={{ user, ready, login, logout }}>
            {children}
        </AuthCtx.Provider>
    );
}

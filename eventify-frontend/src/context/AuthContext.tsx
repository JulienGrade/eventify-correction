import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
    sub: string;
    role: string;
};

type AuthContextType = {
    token: string | null;
    role: string | null;
    login: (token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const storedToken = localStorage.getItem("token");

    const [token, setToken] = useState<string | null>(storedToken);

    const [role, setRole] = useState<string | null>(() => {
        if (!storedToken) return null;

        try {
            const decoded: JwtPayload = jwtDecode(storedToken);
            return decoded.role;
        } catch {
            return null;
        }
    });

    function login(token: string) {

        const decoded: JwtPayload = jwtDecode(token);

        localStorage.setItem("token", token);

        setToken(token);
        setRole(decoded.role);
    }

    function logout() {

        localStorage.removeItem("token");

        setToken(null);
        setRole(null);
    }

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}
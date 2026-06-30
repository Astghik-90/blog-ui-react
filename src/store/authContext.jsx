import { createContext, useContext, useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const token = getToken();

    const decodedToken = useMemo(() => {
        if (!token) return null;
        return jwtDecode(token);
    }, [token]);

    const value = {
        isAdmin: decodedToken?.role === 1,
        userId: decodedToken?.sub,
        isAuthenticated: !!token
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
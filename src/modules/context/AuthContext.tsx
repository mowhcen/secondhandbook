"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
    user: { username: string } | null;
    login: (username: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<{ username: string } | null>(null);

    const login = (username: string, password: string) => {
        setUser({ username });
    };

    const logout = () => {
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

import React, { createContext, useContext, useEffect, useState } from 'react';
import { IUser } from '../types/IUser';
import { GetUser, LoginUser } from "../api/User";


import { LoginResult } from "../types/ApiResults";

export interface IUserContext {
    loading: boolean;
    error?: string;
    user?: IUser;
    jwt?: string;
    signIn: (email: string, password: string) => Promise<LoginResult>;
    signOut: () => void;
}

export interface IProviderProps {
    children: React.ReactNode;
}

const UserContext = createContext<IUserContext | null>(null);

export const UserContextProvider = ({ children }: IProviderProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();
    const [user, setUser] = useState<IUser | undefined>();
    const [jwt, setJwt] = useState<string>();

    useEffect(() => {
        // check if session storage contains token & user data on mount
        const tokenStorage = sessionStorage.getItem("token");
        const userStorage = sessionStorage.getItem("user");

        if (tokenStorage !== null && userStorage !== null) {
            setJwt(tokenStorage);
            setUser(JSON.parse(userStorage));
        }
    }, []);
    
    const signIn = async (email: string, password: string): Promise<LoginResult> => {
        console.log("sign in");
        setLoading(true);

        const result = await LoginUser(email, password);
        if (result.accessToken) {
            const userResult = await GetUser(result.accessToken);

            if (userResult.user) {
                setJwt(result.accessToken);
                setUser(userResult.user);

                // Save to session
                sessionStorage.setItem("token", result.accessToken);
                sessionStorage.setItem("user", JSON.stringify(userResult.user));
            }
        }

        setLoading(false);

        return result;
    };

    const signOut = () => {
        setUser(undefined);
        setJwt(undefined);

        sessionStorage.clear();
    };

    return (
        <UserContext.Provider value={{ loading, signIn, signOut, error, user, jwt }}>{children}</UserContext.Provider>
    );
};

// Create a custom hook to use the UserContext
export const useUserContext = (): IUserContext => {
    const context = useContext<IUserContext | null>(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
};

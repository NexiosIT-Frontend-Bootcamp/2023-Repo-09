import React, { createContext, useContext, useState } from 'react';
import { IUser } from '../types/IUser';

import { LoginResult } from "./LoginResult";

export interface IUserContext {
    loading: boolean;
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
    const [user, setUser] = useState<IUser | undefined>();
    const [jwt, setJwt] = useState<string>();

    const signIn = async (email: string, password: string): Promise<LoginResult> => {
        return { success: true };
    };

    const signOut = async () => {
    };

    return <UserContext.Provider value={{ loading, signIn, signOut, user, jwt }}>{children}</UserContext.Provider>;
};

// Create a custom hook to use the UserContext
export const useUserContext = (): IUserContext => {
    const context = useContext<IUserContext | null>(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
};

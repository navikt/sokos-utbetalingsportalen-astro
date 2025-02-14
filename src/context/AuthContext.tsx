import { createContext } from "react";
import type {UserData} from "../types/UserData.ts";

type AuthContextType = {
    userData: UserData;
    isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);

//import { useLocation } from "react-router";
import { Loader } from "@navikt/ds-react";
//import { logFaroError } from "../../utils/grafanaFaro";
import { AuthContext } from "./AuthContext";
import type {UserData} from "../types/UserData.ts";
import {UserDataSchema} from "../types/schema/UserDataSchema.ts";
import {type PropsWithChildren, useEffect, useState} from "react";

export function AuthProvider(props: PropsWithChildren) {
    const [userData, setUserData] = useState<UserData>();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    //const location = useLocation();

    async function authenticateUser() {
        try {
            const response = await fetch("http://localhost:3000/userinfo");
            console.log("DEBUG", response)
            if (!response.ok) {
                const error = new Error(
                    `Failed to fetch user from server: ${response.statusText}}`,
                );
                setError(error);
            }
            const parseResult = UserDataSchema.safeParse(await response.json());
            if (!parseResult.success) {
                const error = new Error(
                    `Failed to parse user data: ${parseResult.error}`,
                );
                setError(error);
            }
            setUserData(parseResult.data);
            setIsAuthenticated(true);
        } catch (err) {
            const error = new Error(`Failed to authenticate user, ${err}`);
            setError(error);
        }
    }

    useEffect(() => {
        console.log("DEBUG")
        authenticateUser();
    }, []);

    if (error) {
        // logFaroError(error);
        throw error;
    }

    if (!isAuthenticated) {
        return (
            <div className="w-full text-center py-16">
                <Loader size="2xlarge" title="Venter..." transparent />
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ userData: userData!, isAuthenticated }}>
            {props.children}
        </AuthContext.Provider>
    );
}

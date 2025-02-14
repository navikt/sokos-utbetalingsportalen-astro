import { useContext } from "react";
import type {UserData} from "../../types/UserData.ts";
import {AuthContext} from "../../context/AuthContext.tsx";
import {AzureAdGroupNameId} from "./microfrontend.ts";
//import { logFaroError } from "../utils/grafanaFaro";

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        const error = new Error("User context must be defined");
        // TODO: Fix later logFaroError(error);
        throw error;
    }

    return context;
}

export function checkRouteAccess(userData: UserData, groupName: string) {
    const adGroups = userData.adGroups;
    return adGroups?.some((id) => id === AzureAdGroupNameId(groupName));
}
import React from "react";
import { AuthContext } from "../context/authContext.jsx";
export function useAuthContext() {
    const authContextValues = React.useContext(AuthContext);
    if (authContextValues == null) {
        throw new Error('To use "useAuthContext" you must wrap component in "AuthProvider" from "authContext.jsx"');
    }
    return authContextValues;
}
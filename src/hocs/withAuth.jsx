import React from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import NotAuthorized from "../pages/notAuthorized.jsx";

export function withAuth(Component) {
    return (props) => {
        const authContext = useAuthContext();
        if (authContext.isLoggedIn) {
            return <Component {...props} />
        }
        else {
            return <NotAuthorized/>
        }
    }
}
import React from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import NotAuthorized from "../pages/notAuthorized.jsx";
export default function AuthRequired({children }, ...props) {
    //fields
    //states
    //refs
    //context
    const authContext = useAuthContext();
    //effects
    //handlers
    //render
    let renderValue = <></>;
    if (authContext.isLoggedIn) {
        return children;
    }
    else {
        return <NotAuthorized />;
    }

    return renderValue;
}
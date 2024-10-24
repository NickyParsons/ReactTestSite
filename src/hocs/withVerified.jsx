import React from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import NotAuthorized from "../pages/notAuthorized.jsx";

export function withVerified(Component) {
    return (props) => {
        const authContext = useAuthContext();
        if (authContext.isVerified) {
            return <Component {...props} />
        }
        else {
            return <NotAuthorized message="Требуется подтвердить учетную запись для просмотра данной страницы"/>
        }
    }
}
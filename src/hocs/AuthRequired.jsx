import React from "react";
import { AuthContext } from "../hocs/AuthProvider.jsx";
import NotAuthorized from "../pages/notAuthorized.jsx";
export default function AuthRequired({children }, ...props) {
    //fields
    //states
    //refs
    //context
    const authContext = React.useContext(AuthContext);
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
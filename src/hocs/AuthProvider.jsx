import React, { createContext, useState } from "react";

const AuthContext = createContext();
function AuthProvider(props) {
    //states
    let [userName, setUserName] = useState(null);
    function setUser(userName) {
        setUserName(userName);
    }
    //render
    let context = {userName, setUser}

    return <AuthContext.Provider value={context}>
        {props.children}
    </AuthContext.Provider>
}

export { AuthProvider, AuthContext }
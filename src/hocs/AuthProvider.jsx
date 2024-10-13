import React, { createContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
function AuthProvider(props) {
    //show render count
    const renderCount = React.useRef(1);
    React.useEffect(() => {
        console.log(`Auth Provider render count: ${renderCount.current}`);
        renderCount.current = renderCount.current + 1;
    });
    //fields
    const cookies = new Cookies();
    //refs
    //states
    let [isLoggedIn, setLoginStatus] = useState(false);
    let [id, setId] = useState("");
    let [email, setEmail] = useState("");
    let [role, setRole] = useState("");
    const [loginResponseMessage, setLoginResponseMessage] = React.useState("");
    //effects
    useLayoutEffect(checkLoginState, []);
    //handlers
    function checkLoginState() {
        const cookie = cookies.get("nasty-boy");
        if (cookie) {
            setLoginStatus(true);
            decodeToken(cookie);
        }
        else {
            setLoginStatus(false);
        }
    }
    function decodeToken(token) {
        let decodedToken = jwtDecode(token);
        const emailKey = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
        const roleKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
        setId(decodedToken["id"]);
        setEmail(decodedToken[emailKey]);
        setRole(decodedToken[roleKey]);
    }
    async function signIn(loginRequestForm) {
        let hostString = `/api/login`;
        let queryString = `email=${loginRequestForm.email}&password=${loginRequestForm.password}`;
        try {
            let response = await fetch(`${hostString}?${queryString}`, {
                method: "POST",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "*/*"
                },
                mode: "cors",
                credentials: "include"
            });
            if (response.status === 200) {
                let data = await response.json();
                cookies.set("nasty-boy", data.token, {
                    path: "/"
                });
                setLoginStatus(true);
                decodeToken(data.token);
            }
            else if (response.status === 400) {
                setLoginResponseMessage(`Ошибка! ${await response.text()}!`);
            }
            else {
                setLoginResponseMessage(`[${response.status}] ${response.statusText}: ${await response.text()}`);
            }
        }
        catch (error) {
            setLoginResponseMessage(`Непредвиденная ошибка! ${error}`);
            console.log(`Something goes wrong: ${error}`);
        }
    }
    async function signOut() {
        if (cookies.get("nasty-boy")) {
            cookies.remove("nasty-boy");
            setLoginStatus(false);
            setId("");
            setEmail("");
            setRole("");
        }
    }
    //render
    let contextValues = { isLoggedIn, signIn, signOut, id, email, role, loginResponseMessage }
    return <AuthContext.Provider value={contextValues}>
        {props.children}
    </AuthContext.Provider>
}

export { AuthProvider, AuthContext }
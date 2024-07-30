import React, { createContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
function AuthProvider(props) {
    //fields
    const cookies = new Cookies();
    const BACKEND_URL = "http://localhost:5214";
    //refs
    let renderCount = useRef(1);
    //states
    let [isLoggedIn, setLoginStatus] = useState(false);
    let [id, setId] = useState("");
    let [email, setEmail] = useState("");
    let [role, setRole] = useState("");
    //effects
    React.useEffect(() => {
        console.log(`Auth Provider render count: ${renderCount.current}`);
        renderCount.current = renderCount.current + 1;
    });
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
        let hostString = `${BACKEND_URL}/login`;
        let queryString = `email=${loginRequestForm.email}&password=${loginRequestForm.password}`;
        try {
            let response = await fetch(`${hostString}?${queryString}`, {
                method: "POST",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "*/*"
                },
                cache: "no-cache",
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
            else if (response.status === 401) {
                console.log("Email or password incorrect");
            }
            else {
                console.log("Unexpected status code");
            }
        }
        catch (error) {
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
    let contextValues = { BACKEND_URL, isLoggedIn, signIn, signOut, id, email, role }
    return <AuthContext.Provider value={contextValues}>
        {props.children}
    </AuthContext.Provider>
}

export { AuthProvider, AuthContext }
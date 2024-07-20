import React, { createContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
function AuthProvider(props) {
    //fields
    const cookies = new Cookies();
    //refs
    let renderCount = useRef(1);
    //states
    let [isLoggedIn, setLoginStatus] = useState(false);
    let [id, setId] = useState("");
    let [email, setEmail] = useState("");
    let [role, setRole] = useState("");
    //effects
    //useEffect(showRenderState);
    useLayoutEffect(checkLoginState, []);
    //handlers
    function showRenderState() {
        console.log(`Render auth provider count: ${renderCount.current}`);
        renderCount.current = renderCount.current + 1;
    }
    function checkLoginState() {
        const cookie = cookies.get("nasty-boy");
        if (cookie) {
            setLoginStatus(true);
            console.log(`Found cookie`);
            decodeToken(cookie);
        }
        else {
            setLoginStatus(false);
            console.log(`cookie not found`);
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
        let hostString = `http://localhost:5214/login`;
        let queryString = `email=${loginRequestForm.email}&password=${loginRequestForm.password}`;
        console.log(`request: ${hostString}?${queryString}`)
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
                cookies.set("nasty-boy", data.token);
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
    let contextValues = { isLoggedIn, signIn, signOut, id, email, role }
    return <AuthContext.Provider value={contextValues}>
        {props.children}
    </AuthContext.Provider>
}

export { AuthProvider, AuthContext }
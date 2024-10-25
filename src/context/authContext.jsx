import React, { createContext, useLayoutEffect, useState } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
function AuthProvider(props) {
    //show render count
    // const renderCount = React.useRef(1);
    // React.useEffect(() => {console.log(`Auth Provider render count: ${renderCount.current++}`);});
    //fields
    const cookies = new Cookies();
    //refs
    //states
    const [isLoggedIn, setLoginStatus] = useState(false);
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    // const [role, setRole] = useState("");
    const [isModerPermission, setModerPermission] = useState(false);
    const [isVerified, setVerified] = React.useState(false);
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
        setId(decodedToken["id"]);
        setEmail(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
        let role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].toLowerCase();
        if (role == "moder" || role == "admin") {
            setModerPermission(true);
        }
        // setRole(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
        setVerified(decodedToken["verified"].toLowerCase() === "true");
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
    function signOut() {
        if (cookies.get("nasty-boy")) {
            cookies.remove("nasty-boy");
        }
        setLoginStatus(false);
        setId("");
        setEmail("");
        setVerified(false);
        setModerPermission(false);
    }
    //render
    let contextValues = { isLoggedIn, signIn, signOut, id, email, isVerified, isModerPermission, loginResponseMessage }
    return <AuthContext.Provider value={contextValues}>
        {props.children}
    </AuthContext.Provider>
}

export { AuthProvider, AuthContext }
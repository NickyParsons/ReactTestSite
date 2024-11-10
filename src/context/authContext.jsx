import React, { createContext, useLayoutEffect, useState } from "react";
import { useFetch } from "../hooks/useFetchData.js";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
function AuthProvider(props) {
    //show render count
    // const renderCount = React.useRef(1);
    // React.useEffect(() => {console.log(`Auth Provider render count: ${renderCount.current++}`);});
    const cookies = new Cookies();
    const [isLoggedIn, setLoginStatus] = useState(false);
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [isModerPermission, setModerPermission] = useState(false);
    const [isVerified, setVerified] = React.useState(false);
    //Надо перевести state на этот объект
    const [userState, setUserState] = React.useState({
        isLoggedIn: false,
        id: null,
        email: null,
        isVerified: false,
        isModerPermission: false
    })
    const loginFetch = useFetch({
        url: "/api/login",
        method: "POST",
        isResponseJson: true,
        executeOnLoad: false,
        onSuccess: (response) => {
            cookies.set("nasty-boy", response.accessToken, {
                            path: "/"
                        });
            cookies.set("passion-flowers", response.refreshToken, {
                            path: "/"
                        });
            decodeToken(response.accessToken);
        }
    });
    const refreshFetch = useFetch({
        url: "/api/refresh-token",
        method: "GET",
        isResponseJson: true,
        executeOnLoad: false,
        onSuccess: (response) => {
            cookies.set("nasty-boy", response.accessToken, {
                            path: "/"
                        });
            cookies.set("passion-flowers", response.refreshToken, {
                            path: "/"
                        });
            decodeToken(response.accessToken);
        }
    });
    const userDataFetch = useFetch({
        url: `/api/users/${id}`,
        method: "GET",
        isResponseJson: true,
        executeOnLoad: false
    });
    //effects
    useLayoutEffect(()=>{
        let cookie = cookies.get("nasty-boy");
        if (cookie) {
            // if (!decodeToken(cookie)) refreshToken();
            refreshToken();
        }
    }, []);
    React.useEffect(()=>{
        if (id !== "") {
            userDataFetch.fetchHandler();
        }
    }, [id])
    //handlers
    function refreshToken(){
        if (cookies.get("nasty-boy") && cookies.get("passion-flowers")) {
            refreshFetch.fetchHandler();
        }
    }
    function signOut() {
        if (cookies.get("nasty-boy")) {
            cookies.remove("nasty-boy");
        }
        if (cookies.get("passion-flowers")) {
            cookies.remove("passion-flowers");
        }
        // Надо бы наверно все таки на бэкэнд обращаться выходить
        setLoginStatus(false);
        setId("");
        setEmail("");
        setVerified(false);
        setModerPermission(false);
    }
    function decodeToken(token) {
        let decodedToken = jwtDecode(token);
        const unixExpiredDateTime = parseInt(decodedToken["exp"]);
        const expiredDateTime = new Date(unixExpiredDateTime*1000);
        const currentDateTime = new Date();
        if (expiredDateTime > currentDateTime) {
            setLoginStatus(true);
            setId(decodedToken["id"]);
            setEmail(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
            let role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].toLowerCase();
            if (role == "moder" || role == "admin") setModerPermission(true);
            setVerified(decodedToken["verified"].toLowerCase() === "true");
            return true;
        } else {
            return false;
        }
    }
    //render
    let contextValues = { isLoggedIn, refreshToken, signOut, id, email, isVerified, isModerPermission, loginFetch, refreshFetch, userDataFetch }
    return <AuthContext.Provider value={contextValues}>
        {props.children}
    </AuthContext.Provider>
}

export { AuthProvider, AuthContext }
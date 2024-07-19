import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from "react";
import Cookies from "universal-cookie";

import { RegisterForm } from "./registerForm.jsx";
import { LoginForm } from "./loginForm.jsx";
import { AuthContext } from "../hocs/AuthProvider.jsx";

function LoginControl(props) {
    //fields
    const cookies = new Cookies();
    //refs
    let renderCount = useRef(1);
    let loginRequestRef = useRef({
        email: "",
        password: ""
    });
    let registerRequestRef = useRef({
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    });
    //context
    let context = useContext(AuthContext);
    //states
    let [isLoogedIn, setLoggedState] = useState(false);
    let [isRegisterVisible, setRegisterVisibility] = useState(false);
    let [isLoginVisible, setLoginVisibility] = useState(false);
    //effects
    useEffect(showRenderState);
    useLayoutEffect(checkLoginState, []);
    //handlers
    function showRenderState() {
        console.log(`Render count: ${renderCount.current}`);
        renderCount.current = renderCount.current + 1;
    }
    function checkLoginState() {
        if (cookies.get("nasty-boy")) {
            setLoggedState(true);
            console.log(`Found cookie`);
        }
        else {
            setLoggedState(false);
            console.log(`cookie not found`);
        }
    }
    async function submitLoginForm(event) {
        event.preventDefault();
        let hostString = `http://localhost:5214/login`;
        let queryString = `email=${loginRequestRef.current.email}&password=${loginRequestRef.current.password}`;
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
                setLoggedState(true);
                context.setUser(data.email);
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
        setLoginVisibility(false);
    }
    async function submitRegisterForm(event) {
        event.preventDefault();
        let hostString = `http://localhost:5214/register`;
        let queryString = `email=${registerRequestRef.current.email}&firstname=${registerRequestRef.current.firstName}&lastname=${registerRequestRef.current.lastName}&password=${registerRequestRef.current.password}`;
        console.log(`request: ${hostString}?${queryString}`)
        try {
            let response = await fetch(`${hostString}?${queryString}`, {
                method: "POST",
                mode: "no-cors"
            });
        }
        catch (error) {
            console.log(`Something goes wrong: ${error}`);
        }
        setRegisterVisibility(false);
    }
    function toggleRigisterFormVisibility(event) {
        event.preventDefault();
        if (isLoginVisible) {
            setLoginVisibility(false);
        }
        setRegisterVisibility(isRegisterVisible === true ? false : true);
    }
    function toggleLoginFormVisibility(event) {
        event.preventDefault();
        if (isRegisterVisible) {
            setRegisterVisibility(false);
        }
        setLoginVisibility(isLoginVisible === true ? false : true);
    }
    function logout(event) {
        event.preventDefault();
        if (cookies.get("nasty-boy")) {
            cookies.remove("nasty-boy");
            setLoggedState(false);
        }
    }
    //render
    let registerFormClasses = `popUpWindow ${isRegisterVisible ? "windowVisible" : "windowHidden"}`;
    let loginFormClasses = `popUpWindow ${isLoginVisible ? "windowVisible" : "windowHidden"}`;
    let buttons = <></>;
    if (isLoogedIn) {
        buttons = <a href="/logout" className="navLink" onClick={logout}>Выход</a>
    }
    else {
        buttons = <>
            <a href="/register" id="openRegisterBtn" className="navLink" onClick={toggleRigisterFormVisibility}>Регистрация</a>
            <a href="/login" id="openLoginBtn" className="navLink" onClick={toggleLoginFormVisibility}>Вход</a>
        </>
    }
    return <>
        <div className="menu" id="logon">
            <div id="loginWindow" className={loginFormClasses}>
                <LoginForm submitHandler={submitLoginForm} requestForm={loginRequestRef.current} />
                <button onClick={toggleLoginFormVisibility}>Закрыть</button>
            </div>
            <div id="registerWindow" className={registerFormClasses}>
                <RegisterForm submitHandler={submitRegisterForm} requestForm={registerRequestRef.current} />
                <button onClick={toggleRigisterFormVisibility}>Закрыть</button>
            </div>
            {buttons}
        </div>
        
    </>
}

export { LoginControl };
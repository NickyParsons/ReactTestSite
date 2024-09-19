import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from "react";

import RegisterForm from "./registerForm.jsx";
import LoginForm from "./loginForm.jsx";
import { AuthContext } from "../hocs/AuthProvider.jsx";
import UserControl from "../hocs/UserControl.jsx";
import LoggedUserMenu from "./loggedUserMenu.jsx";

import "../styles/popUpWindow.css";

function LoginControl(props) {
    //fields
    //refs
    const renderCount = useRef(1);
    const loginRequestRef = React.useRef({
        email: "",
        password: ""
    });
    const registerRequestRef = React.useRef({
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    });
    //context
    const authContext = useContext(AuthContext);
    //states
    const [isRegisterVisible, setRegisterVisibility] = useState(false);
    const [isLoginVisible, setLoginVisibility] = useState(false);
    //effects
    /*useEffect(showRenderState);*/
    //handlers
    function showRenderState() {
        console.log(`Login Control render count: ${renderCount.current}`);
        renderCount.current = renderCount.current + 1;
    }
    async function submitLoginForm(event) {
        event.preventDefault();
        authContext.signIn(loginRequestRef.current);
        event.target.reset();
        setLoginVisibility(false);
    }
    async function submitRegisterForm(event) {
        event.preventDefault();
        let hostString = `/api/register`;
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
        event.target.reset();
        setRegisterVisibility(false);
    }
    function logout(event) {
        event.preventDefault();
        authContext.signOut();
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
    //render
    const registerFormClasses = `popUpWindow ${isRegisterVisible ? "windowVisible" : "windowHidden"}`;
    const loginFormClasses = `popUpWindow ${isLoginVisible ? "windowVisible" : "windowHidden"}`;
    let buttons = <></>;
    if (authContext.isLoggedIn) {
        buttons = <>
            <p>{authContext.email}</p>
            <UserControl id={authContext.id}>
                <LoggedUserMenu />
            </UserControl>
        </>
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
                <button onClick={toggleLoginFormVisibility} className="neon-button">Закрыть</button>
            </div>
            <div id="registerWindow" className={registerFormClasses}>
                <RegisterForm submitHandler={submitRegisterForm} requestForm={registerRequestRef.current} />
                <button onClick={toggleRigisterFormVisibility} className="neon-button">Закрыть</button>
            </div>
            {buttons}
        </div>
        
    </>
}

export { LoginControl };
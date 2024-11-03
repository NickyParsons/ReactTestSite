import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./registerForm.jsx";
import LoginForm from "./loginForm.jsx";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { LoggedUserControl } from "./loggedUserControl.jsx";
import { ResponseMessagePlaceholder, LoadDataPlaceholder } from "../components/fetchPlaceholders.jsx";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { useFetch } from "../hooks/useFetchData.js";

import "../styles/popUpWindow.css";

function LoginControl(props) {
    //show render count
    // const renderCount = React.useRef(1);
    // React.useEffect(() => {console.log(`Login Control render count: ${renderCount.current++}`);});
    //fields
    const navigate = useNavigate();
    //refs
    const registerWindowRef = React.useRef();
    const loginWindowRef = React.useRef();
    const registerButtonRef = React.useRef();
    const loginButtonRef = React.useRef();
    //context
    const authContext = useAuthContext();
    //states
    const [isRegisterVisible, setRegisterVisibility] = React.useState(false);
    const [isLoginVisible, setLoginVisibility] = React.useState(false);
    //handlers
    function goTo(page){
        console.log("Попал куда надоы");
        setRegisterVisibility(false);
        document.body.removeEventListener("click", registerClickOutside);
        setLoginVisibility(false);
        document.body.removeEventListener("click", loginClickOutside);
        navigate(page);
    }
    const registerClickOutside = React.useCallback((event) => {
        if (!(event.composedPath().includes(registerWindowRef.current) || event.composedPath().includes(registerButtonRef.current))) {
            setRegisterVisibility(false);
            document.body.removeEventListener("click", registerClickOutside);
        }
    }, []);
    const loginClickOutside = React.useCallback((event) => {
        if (!(event.composedPath().includes(loginWindowRef.current) || event.composedPath().includes(loginButtonRef.current))) {
            setLoginVisibility(false);
            document.body.removeEventListener("click", loginClickOutside);
        }
    }, []);
    function toggleRegisterFormVisibility() {
        if (isLoginVisible) {
            toggleLoginFormVisibility();
        }
        if (isRegisterVisible) {
            setRegisterVisibility(false);
            document.body.removeEventListener("click", registerClickOutside);
        }
        else {
            setRegisterVisibility(true);
            document.body.addEventListener("click", registerClickOutside);
        }
    }
    function toggleLoginFormVisibility() {
        if (isRegisterVisible) {
            toggleRegisterFormVisibility();
        }
        if (isLoginVisible) {
            setLoginVisibility(false);
            document.body.removeEventListener("click", loginClickOutside);
        }
        else {
            setLoginVisibility(true);
            document.body.addEventListener("click", loginClickOutside);
        }
    }
    //render
    let buttons;
    if (authContext.isLoggedIn) {
        buttons = <>
            <p>{authContext.email}</p>
            <LoggedUserControl/>
        </>
    }
    else {
        const registerFormClasses = `popUpWindow ${isRegisterVisible ? "windowVisible" : "windowHidden"}`;
        const loginFormClasses = `popUpWindow ${isLoginVisible ? "windowVisible" : "windowHidden"}`;

        buttons = <>
            <button id="openRegisterBtn" className="navLink" onClick={toggleRegisterFormVisibility} ref={registerButtonRef}>Регистрация</button>
            <button id="openLoginBtn" className="navLink" onClick={toggleLoginFormVisibility} ref={loginButtonRef}>Вход</button>
            <div id="loginWindow" className={loginFormClasses} ref={loginWindowRef}>
                <LoginForm navigateHandler={goTo} toggleVisible={toggleLoginFormVisibility}/>
            </div>
            <div id="registerWindow" className={registerFormClasses} ref={registerWindowRef}>
                <RegisterForm toggleVisible={toggleLoginFormVisibility}/>
            </div>
        </>
    }
    return <>
        <div className="menu" id="logon">
            {buttons}
        </div>
    </>
}

export { LoginControl };
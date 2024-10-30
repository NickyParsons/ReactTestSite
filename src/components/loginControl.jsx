import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./registerForm.jsx";
import LoginForm from "./loginForm.jsx";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { LoggedUserControl } from "./loggedUserControl.jsx";
import { ResponseMessagePlaceholder, LoadDataPlaceholder } from "../components/fetchPlaceholders.jsx";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";

import "../styles/popUpWindow.css";

function LoginControl(props) {
    //show render count
    // const renderCount = React.useRef(1);
    // React.useEffect(() => {console.log(`Login Control render count: ${renderCount.current++}`);});
    //fields
    const navigate = useNavigate();
    //refs
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
    const registerWindowRef = React.useRef();
    const loginWindowRef = React.useRef();
    const registerButtonRef = React.useRef();
    const loginButtonRef = React.useRef();
    //context
    const authContext = useAuthContext();
    //states
    const [isRegisterVisible, setRegisterVisibility] = React.useState(false);
    const [isLoginVisible, setLoginVisibility] = React.useState(false);
    const [registerResponseMessage, setRegisterResponseMessage] = React.useState("");
    //effects
    //handlers
    const submitLoginForm = React.useCallback((event) => {
        event.preventDefault();
        authContext.signIn(loginRequestRef.current);
        event.target.reset();
        //setLoginVisibility(false);
    }, []);
    const submitRegisterForm = React.useCallback(async (event) => {
        event.preventDefault();
        let hostString = `/api/register`;
        let queryString = `email=${registerRequestRef.current.email}&firstname=${registerRequestRef.current.firstName}&lastname=${registerRequestRef.current.lastName}&password=${registerRequestRef.current.password}`;
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
                setRegisterResponseMessage("Пользователь успешно зарегистрирован!");
            }
            else if (response.status === 400) {
                setRegisterResponseMessage(`Ошибка! ${await response.text()}!`);
            }
            else {
                setRegisterResponseMessage(`[${response.status}] ${response.statusText}: ${await response.text()}`);
            }
        }
        catch (error) {
            setRegisterResponseMessage(`Непредвиденная ошибка! ${error}`);
            console.log(`Something goes wrong: ${error}`);
        }
        event.target.reset();
        //setRegisterVisibility(false);
    }, []);
    function logout(event) {
        event.preventDefault();
        authContext.signOut();
    }
    function goTo(page){
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
    let buttons = <></>;

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
                <Container>
                    <LoginForm submitHandler={submitLoginForm} requestForm={loginRequestRef} />
                    <ResponseMessagePlaceholder statusCode={authContext.loginFetch.statusCode} data={authContext.loginFetch.data} successMessage="Успешный вход"/>
                    <button onClick={() => { goTo("/forgot-password") }} className="neon-button">Забыл пароль</button>
                    <button onClick={() => { goTo("/reset-password") }} className="neon-button">Сбросить пароль</button>
                    <button onClick={toggleLoginFormVisibility} className="neon-button">Закрыть</button>
                </Container>
            </div>
            <div id="registerWindow" className={registerFormClasses} ref={registerWindowRef}>
                <RegisterForm submitHandler={submitRegisterForm} requestForm={registerRequestRef} />
                <span>{registerResponseMessage }</span><br/>
                <button onClick={toggleRegisterFormVisibility} className="neon-button">Закрыть</button>
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
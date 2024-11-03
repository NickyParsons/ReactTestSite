import React, { useState, useRef } from "react";
import { useFetch } from "../hooks/useFetchData.js";
import { ResponseMessagePlaceholder, LoadDataPlaceholder } from "../components/fetchPlaceholders.jsx";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import "../styles/userForms.css";
export default React.memo(function RegisterForm(props) {
    //show render count
    // const renderCount = React.useRef(1);
    // React.useEffect(() => {console.log(`Register form render count: ${renderCount.current++}`);});
    //refs
    const formRef = useRef();
    //states
    const [isEmailValid, setEmailValid] = useState(true);
    const [isFirstName, setFirstNameValid] = useState(true);
    const [isLastName, setLastNameValid] = useState(true);
    const [isPasswordValid, setPasswordValid] = useState(true);
    const [isRepeatPasswordValid, setRepeatPasswordValid] = useState(true);
    const registerFetch = useFetch({
        url: "/api/register",
        method: "POST",
        isResponseJson: false,
        executeOnLoad: false
    });
    //handlers
    function changeEmail(event) {
        event.target.validity.valid ? setEmailValid(true) : setEmailValid(false);
    }
    function changeFirstName(event) {
        if (event.target.value.length > 20) {
            event.target.setCustomValidity("Не более 20 символов");
        }
        else {
            event.target.setCustomValidity("");
        }
        event.target.validity.valid ? setFirstNameValid(true) : setFirstNameValid(false);
    }
    function changeLastName(event) {
        if (event.target.value.length > 20) {
            event.target.setCustomValidity("Не более 20 символов");
        }
        else {
            event.target.setCustomValidity("");
        }
        event.target.validity.valid ? setLastNameValid(true) : setLastNameValid(false);
    }
    function validatePassword() {
        const password = formRef.current.password;
        const repeatPassword = formRef.current.repeatPassword;
        if (password.value.length < 6) {
            password.setCustomValidity("Слишком короткий");
        }
        else {
            password.setCustomValidity("");
        }
        if (password.value !== repeatPassword.value) {
            repeatPassword.setCustomValidity("Пароли не совпадают");
        }
        else {
            repeatPassword.setCustomValidity("");
        }
        password.validity.valid ? setPasswordValid(true) : setPasswordValid(false);
        repeatPassword.validity.valid ? setRepeatPasswordValid(true) : setRepeatPasswordValid(false);
    }
    function submit(event){
        event.preventDefault();
        let formData = new FormData();
        formData.append("email", event.target.email.value);
        formData.append("firstname", event.target.firstname.value);
        formData.append("lastname", event.target.lastname.value);
        formData.append("password", event.target.password.value);
        registerFetch.fetchHandler(formData);
        event.target.reset();
    }
    //render
    const emailClass = isEmailValid ? "active-input" : "invalid-active-input";
    const firstNameClass = isFirstName ? "active-input" : "invalid-active-input";
    const lastNameClass = isLastName ? "active-input" : "invalid-active-input";
    const passwordClass = isPasswordValid ? "active-input" : "invalid-active-input";
    const repeatPasswordClass = isRepeatPasswordValid ? "active-input" : "invalid-active-input";
    return <>
        <Container>
            <ResponseMessagePlaceholder statusCode={registerFetch.statusCode} data={registerFetch.data} successMessage="Успешная регистрация"/>
            <form id="registerForm" method="post" ref={formRef} action="/api/register" onSubmit={submit}>
            <Row>
                <Column1>E-Mail:</Column1>
                <Column2>
                <input className={emailClass} type="email" id="email" name="email" onChange={changeEmail} required />
                </Column2>
            </Row>
            <Row>
                <Column1>Имя:</Column1>
                <Column2>
                <input className={firstNameClass} type="text" id="firstname" name="firstname" onChange={changeFirstName} />
                </Column2>
            </Row>
            <Row>
                <Column1>Фамилия:</Column1>
                <Column2>
                <input className={lastNameClass} type="text" id="lastname" name="lastname" onChange={changeLastName} />
                </Column2>
            </Row>
            <Row>
                <Column1>Пароль:</Column1>
                <Column2>
                <input className={passwordClass} type="password" id="password" name="password" onChange={validatePassword} required />
                </Column2>
            </Row>
            <Row>
                <Column1>Повторите пароль:</Column1>
                <Column2>
                <input className={repeatPasswordClass} type="password" id="repeatPassword" onChange={validatePassword} required />
                </Column2>
            </Row>
            <Row>
                <Column>
                <button type="submit" className="neon-button">Регистрация</button>
                </Column>
            </Row>
            </form>
            <Row>
                <Column>
                    <button onClick={props.toggleVisible} className="neon-button">Закрыть</button>
                </Column>
            </Row>
        </Container>
    </>
})
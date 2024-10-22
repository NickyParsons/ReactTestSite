import React, { useState, useRef } from "react";
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
    //handlers
    function changeEmail(event) {
        props.requestForm.current.email = event.target.value;
        event.target.validity.valid ? setEmailValid(true) : setEmailValid(false);
    }
    function changeFirstName(event) {
        props.requestForm.current.firstName = event.target.value;
        if (event.target.value.length > 20) {
            event.target.setCustomValidity("Не более 20 символов");
        }
        else {
            event.target.setCustomValidity("");
        }
        event.target.validity.valid ? setFirstNameValid(true) : setFirstNameValid(false);
    }
    function changeLastName(event) {
        props.requestForm.current.lastName = event.target.value;
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
        props.requestForm.current.password = password.value;
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
    //render
    const emailClass = isEmailValid ? "validFormField" : "invalidFormField";
    const firstNameClass = isFirstName ? "validFormField" : "invalidFormField";
    const lastNameClass = isLastName ? "validFormField" : "invalidFormField";
    const passwordClass = isPasswordValid ? "validFormField" : "invalidFormField";
    const repeatPasswordClass = isRepeatPasswordValid ? "validFormField" : "invalidFormField";
    return <>
        <form id="registerForm" method="post" ref={formRef} action="/api/register" onSubmit={props.submitHandler}>
            <div className={emailClass}>
                <label htmlFor="email">E-Mail:</label>
                <input type="email" id="email" name="email" onChange={changeEmail} required />
            </div>
            <div className={firstNameClass}>
                <label htmlFor="firstname">Имя:</label>
                <input type="text" id="firstname" name="firstname" onChange={changeFirstName} />
            </div>
            <div className={lastNameClass}>
                <label htmlFor="lastname">Фамилия:</label>
                <input type="text" id="lastname" name="lastname" onChange={changeLastName} />
            </div>
            <div className={passwordClass}>
                <label htmlFor="password">Пароль:</label>
                <input type="password" id="password" name="password" onChange={validatePassword} required />
            </div>
            <div className={repeatPasswordClass}>
                <label htmlFor="repeatPassword">Повторите пароль:</label>
                <input type="password" id="repeatPassword" onChange={validatePassword} required />
            </div>
            <button type="submit" className="neon-button">Регистрация</button>
        </form>
    </>
})
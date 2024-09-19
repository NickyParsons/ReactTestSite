import React from "react";
import "../styles/forms.css";

export default function LoginForm(props) {
    //states
    const [isEmailValid, setEmailValid] = React.useState(true);
    const [isPasswordValid, setPasswordValid] = React.useState(true);
    //handlers
    function changeEmail(event) {
        props.requestForm.email = event.target.value;
        event.target.validity.valid ? setEmailValid(true) : setEmailValid(false);
    }
    function changePassword(event) {
        props.requestForm.password = event.target.value;
        event.target.validity.valid ? setPasswordValid(true) : setPasswordValid(false);
    }
    //render
    const emailClass = isEmailValid ? "validFormField" : "invalidFormField";
    const passwordClass = isPasswordValid ? "validFormField" : "invalidFormField";
    return <>
        <form id="loginForm" method="post" action="/api/login" onSubmit={props.submitHandler}>
            <div className={emailClass}>
                <label htmlFor="loginEmail">E-Mail:</label>
                <input type="email" id="loginEmail" name="email" onChange={changeEmail} required />
            </div>

            <div className={passwordClass}>
                <label htmlFor="loginPassword">Пароль:</label>
                <input type="password" id="loginPassword" name="password" required onChange={changePassword} />
            </div>
            <button type="submit" className="neon-button">Войти</button>
        </form>
    </>
}
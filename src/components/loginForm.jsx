import React from "react";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { GreenMessage, RedMessage, WhiteMessage } from "../components/containedColorMessage.jsx";

export default React.memo((props) => {
    //show render count
    // const renderCount = React.useRef(1);
    // React.useEffect(() => {console.log(`Login form render count: ${renderCount.current++}`);});
    //states
    const [isEmailValid, setEmailValid] = React.useState(true);
    const [isPasswordValid, setPasswordValid] = React.useState(true);
    //handlers
    function changeEmail(event) {
        props.requestForm.current.email = event.target.value;
        event.target.validity.valid ? setEmailValid(true) : setEmailValid(false);
    }
    function changePassword(event) {
        props.requestForm.current.password = event.target.value;
        event.target.validity.valid ? setPasswordValid(true) : setPasswordValid(false);
    }
    //render
    const emailClass = isEmailValid ? "active-input" : "invalid-active-input";
    const passwordClass = isPasswordValid ? "active-input" : "invalid-active-input";
    return <>
        <form id="loginForm" method="post" action="/api/login" onSubmit={props.submitHandler}>
                <Row>
                    <Column1>E-Mail:</Column1>
                    <Column2>
                        <input type="email" name="email" className={emailClass} onChange={changeEmail} required />
                    </Column2>
                </Row>
                <Row>
                    <Column1>Пароль:</Column1>
                    <Column2>
                        <input type="password" name="password" className={passwordClass} required onChange={changePassword} />
                    </Column2>
                </Row>
                <Row>
                    <Column>
                        <button type="submit" className="neon-button">Войти</button>
                    </Column>
                </Row>
            </form>
    </>
})
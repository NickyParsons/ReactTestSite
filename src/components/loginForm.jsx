import React from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { ResponseMessagePlaceholder, LoadDataPlaceholder } from "../components/fetchPlaceholders.jsx";

export default React.memo((props) => {
    //show render count
    // const renderCount = React.useRef(1);
    // React.useEffect(() => {console.log(`Login form render count: ${renderCount.current++}`);});
    //context
    const authContext = useAuthContext();
    //states
    const [isEmailValid, setEmailValid] = React.useState(true);
    const [isPasswordValid, setPasswordValid] = React.useState(true);
    //handlers
    function changeEmail(event) {
        event.target.validity.valid ? setEmailValid(true) : setEmailValid(false);
    }
    function changePassword(event) {
        event.target.validity.valid ? setPasswordValid(true) : setPasswordValid(false);
    }
    function submit(event){
        event.preventDefault();
        let formData = new FormData();
        formData.append("email", event.target.email.value);
        formData.append("password", event.target.password.value);
        authContext.loginFetch.fetchHandler(formData);
        event.target.reset();
    }
    //render
    const emailClass = isEmailValid ? "active-input" : "invalid-active-input";
    const passwordClass = isPasswordValid ? "active-input" : "invalid-active-input";
    return <>
        <Container>
        <ResponseMessagePlaceholder statusCode={authContext.loginFetch.statusCode} data={authContext.loginFetch.data} successMessage="Успешный вход"/>
            <form id="loginForm" method="post" action="/api/login" onSubmit={submit}>
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
            <button onClick={() => { props.navigateHandler("/forgot-password") }} className="menu-button">Забыл пароль</button>
            <button onClick={() => { props.navigateHandler("/reset-password") }} className="menu-button">Сбросить пароль</button>
            <Row>
                <Column>
                    <button onClick={props.toggleVisible} className="neon-button">Закрыть</button>
                </Column>
            </Row>
        </Container>
    </>
})
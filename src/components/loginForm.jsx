import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Column, Column1, Column2, BackButton } from "../hocs/ContentContainer.jsx";
import { GreenMessage, RedMessage, WhiteMessage } from "../components/containedColorMessage.jsx";

export default React.memo((props) => {
    //show render count
    const renderCount = React.useRef(1);
    React.useEffect(() => {
        console.log(`Login form render count: ${renderCount.current}`);
        renderCount.current = renderCount.current + 1;
    });
    //fields
    const navigate = useNavigate();
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
        <Container>
            <form id="loginForm" method="post" action="/api/login" onSubmit={props.submitHandler}>
                <Row>
                    <Column1>E-Mail:</Column1>
                    <Column2>
                        <input type="email" name="email" className="active-input" onChange={changeEmail} required />
                    </Column2>
                </Row>
                <Row>
                    <Column1>Пароль:</Column1>
                    <Column2>
                        <input type="password" name="password" className="active-input" required onChange={changePassword} />
                    </Column2>
                </Row>
                <Row>
                    <Column>
                        <button type="submit" className="neon-button">Войти</button>
                    </Column>
                </Row>
            </form>
            <Row>
                <Column>
                    <button onClick={() => { navigate("/forgot-password") }} className="neon-button">Забыл пароль</button>
                </Column>
            </Row>
        </Container>
    </>
})
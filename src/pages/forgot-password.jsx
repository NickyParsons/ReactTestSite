import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { GreenMessage, RedMessage, WhiteMessage } from "../components/containedColorMessage.jsx";

export default function ForgotPassword(props) {
    //show render count
    const renderCount = React.useRef(1);
    React.useEffect(() => { console.log(`Forgot password page render count: ${renderCount.current++}`); });
    //page title
    const pageTitle = "Восстановление пароля";
    React.useLayoutEffect(() => {
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }, []);
    //fields
    const navigate = useNavigate();
    //context
    //const authContext = React.useContext(AuthContext);
    //states
    const [message, setMessage] = React.useState(<></>);
    //effects
    //handlers
    async function submit(event) {
        event.preventDefault();
        try {
            setMessage(<Container><WhiteMessage text="Loading..." /></Container>);
            let response = await fetch(`/api/forgot-password?email=${event.target.email.value}`, {
                method: "POST",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "*/*"
                },
                mode: "cors",
                credentials: "include"
            });
            if (response.status === 200) {
                setMessage(<GreenMessage text="Письмо с инструкциями по восстановлению запрошено. Проверьте почту." />);
            }
            else {
                setMessage(<RedMessage text="Не удалось восстановить пароль. Проверьте правильность e-mail." />);
            }
            console.log(`[${response.status}] ${response.statusText}: ${await response.text()}`);

        }
        catch (error) {
            setMessage(<RedMessage text="Что то пошло не так" />);
            console.log(`Something goes wrong: ${error}`);
        }
    }
    //render
    return <>
        <BackButton/>
        <Container>
            <form onSubmit={submit}>
                <Row>
                    <Column1>E-mail</Column1>
                    <Column2><input name="email" type="email" className="active-input"></input></Column2>
                </Row>
                <Row>
                    <Column><button type="submit" className="neon-button">Отправить</button></Column>
                </Row>
            </form>
            {message}
        </Container>
    </>
}
import React from "react";
import { Container, Row, Column, Column1, Column2, BackButton } from "../hocs/ContentContainer.jsx";
import { GreenMessage, RedMessage } from "../components/containedColorMessage.jsx";
import { AuthContext } from "../hocs/AuthProvider.jsx";

export default function() {
    //page title
    const pageTitle = "Смена E-mail";
    React.useLayoutEffect(() => {
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }, []);
    //context
    const authContext = React.useContext(AuthContext);
    //states
    const [message, setMessage] = React.useState(<></>);
    //handlers
    const submitForm = (event) => {
        event.preventDefault();
        console.log(`Event: ${event.target.email.value}`);
        changeEmail(event.target.email.value);
    }
    async function changeEmail(newEmail) {
        try {
            setMessage("Loading...");
            let response = await fetch(`/api/change-email?email=${authContext.email}&newemail=${newEmail}`, {
                method: "POST",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "*/*"
                },
                mode: "cors",
                credentials: "include"
            });
            if (response.status === 200) {
                setMessage(<GreenMessage text="Email успешно подтвержден!" />);
            }
            else {
                setMessage(<RedMessage text="Что то пошло не так" />);
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
            <form onSubmit={submitForm}>
                <Row>
                    <Column1>Новый E-mail:</Column1>
                    <Column2>
                        <input name="email" className="active-input"></input>
                    </Column2>
                </Row>
                <Row>
                    <Column>
                        <button type="submit" className="neon-button">Отправить</button>
                    </Column>
                </Row>
                { message }
            </form>
        </Container>
    </>;
}
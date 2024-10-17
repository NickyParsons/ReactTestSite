import React from "react";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { GreenMessage, RedMessage, WhiteMessage } from "../components/containedColorMessage.jsx";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { withAuth } from "../hocs/withAuth.jsx";

export default withAuth(ChangeEmail);
export function ChangeEmail() {
    //page title
    const pageTitle = "Смена E-mail";
    React.useLayoutEffect(() => {
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }, []);
    //context
    const authContext = useAuthContext();
    //states
    const [message, setMessage] = React.useState(<></>);
    //handlers
    const submitForm = (event) => {
        event.preventDefault();
        changeEmail(event.target.email.value);
    }
    async function changeEmail(newEmail) {
        try {
            setMessage(<WhiteMessage text="Loading..."/>);
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
                setMessage(<GreenMessage text="Email успешно изменен!" />);
                setTimeout(authContext.signOut, 2000);
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
import React from "react";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { useFetchOnTrigger } from "../hooks/useFetchData.js";
import { ResponseMessagePlaceholder, LoadDataPlaceholder } from "../components/fetchPlaceholders.jsx";

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
    const {handler, isLoading, statusCode, data, error} = useFetchOnTrigger();
    //handlers
    async function submit(event) {
        event.preventDefault();
        handler(`/api/forgot-password?email=${event.target.email.value}`, "POST", false)
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
            <Row>
                <LoadDataPlaceholder isLoading={isLoading} error={error}>
                    <ResponseMessagePlaceholder statusCode={statusCode} data={data} successMessage="Письмо с инструкциями по восстановлению запрошено. Проверьте почту."/>
                </LoadDataPlaceholder>
            </Row>
        </Container>
    </>
}
import React from "react";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { useFetch } from "../hooks/useFetchData.js";
import { ResponseMessagePlaceholder, LoadDataPlaceholder } from "../components/fetchPlaceholders.jsx";

export default function ForgotPassword(props) {
    //show render count
    // const renderCount = React.useRef(1);
    // React.useEffect(() => { console.log(`Forgot password page render count: ${renderCount.current++}`); });
    //page title
    const pageTitle = "Восстановление пароля";
    React.useLayoutEffect(() => {
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }, []);
    //states
    const {fetchHandler, isLoading, statusCode, data, error} = useFetch({
        url: "/api/forgot-password",
        method: "POST",
        isResponseJson: false,
        executeOnLoad: false
    });
    //handlers
    async function submit(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append("email", event.target.email.value);
        fetchHandler({formData: formData});
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
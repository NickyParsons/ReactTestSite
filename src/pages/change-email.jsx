import React from "react";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { withAuth } from "../hocs/withAuth.jsx";
import { usePostFetchOnTrigger } from "../hooks/useFetchData.js";
import { ResponseMessagePlaceholder, LoadDataPlaceholder } from "../components/fetchPlaceholders.jsx";

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
    //fields
    const {handler, isLoading, statusCode, data, error} = usePostFetchOnTrigger();
    //handlers
    const submitForm = (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append("email", authContext.email);
        formData.append("newemail", event.target.email.value);
        handler("/api/change-email", {
            formData: formData,
            onSuccess: ()=>{setTimeout(authContext.signOut, 2000);}
        });
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
                <Row>
                    <LoadDataPlaceholder isLoading={isLoading} error={error}>
                        <ResponseMessagePlaceholder statusCode={statusCode} data={data} successMessage="Email успешно изменен!"/>
                    </LoadDataPlaceholder>
                </Row>
            </form>
        </Container>
    </>;
}
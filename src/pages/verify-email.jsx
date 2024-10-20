import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { useFetchOnTrigger } from "../hooks/useFetchData.js";
import { ResponseMessagePlaceholder, LoadDataPlaceholder } from "../components/fetchPlaceholders.jsx";

export default function VerifyEmail(props) {
    //show render count
    const renderCount = React.useRef(1);
    React.useEffect(() => { console.log(`Verify email page render count: ${renderCount.current++}`); });
    //page title
    const pageTitle = "Подтверждение E-mail";
    React.useLayoutEffect(() => {
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }, []);
    //fields
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token");
    const {handler, isLoading, statusCode, data, error} = useFetchOnTrigger();
    //effects
    React.useLayoutEffect(() => { 
        if (token != null) {
            handler(`/api/verify-email?token=${encodeURIComponent(token)}`, "POST", false);
        }
    }, [token]);
    //handlers
    function submitToken(event) {
        event.preventDefault();
        setSearchParams(`token=${encodeURIComponent(event.target.token.value)}`);
    }
    //render
    return <>
        <BackButton/>
        <Container>
            <form onSubmit={submitToken}>
                <Row>
                    <Column1>Token:</Column1>
                    <Column2><input name="token" type="text" className="active-input" defaultValue={token}></input></Column2>
                </Row>
                <Row>
                    <Column><button type="submit" className="neon-button">Отправить</button></Column>
                </Row>
            </form>
            <Row>
                <LoadDataPlaceholder isLoading={isLoading} error={error}>
                    <ResponseMessagePlaceholder statusCode={statusCode} data={data} successMessage="Email успешно подтвержден!"/>
                </LoadDataPlaceholder>
            </Row>
        </Container>
    </>
}
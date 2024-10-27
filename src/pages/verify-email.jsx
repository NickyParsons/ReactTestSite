import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { usePostFetchOnTrigger, useFetch } from "../hooks/useFetchData.js";
import { ResponseMessagePlaceholder, LoadDataPlaceholder } from "../components/fetchPlaceholders.jsx";
import { useAuthContext } from "../hooks/useAuthContext.js";

export default function VerifyEmail(props) {
    //show render count
    // const renderCount = React.useRef(1);
    // React.useEffect(() => { console.log(`Verify email page render count: ${renderCount.current++}`); });
    //page title
    const pageTitle = "Подтверждение E-mail";
    React.useLayoutEffect(() => {
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }, []);
    //context
    const authContext = useAuthContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token");
    const {fetchHandler, isLoading, statusCode, data, error} = useFetch({
        url: "/api/verify-email",
        method: "POST",
        isResponseJson: false,
        onSuccess: ()=>{
            authContext.refreshToken();
        },
        executeOnLoad: false
    });
    //effects
    React.useLayoutEffect(() => { 
        if (token != null) {
            let formData = new FormData();
            formData.append("token", token);
            fetchHandler(formData);
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
            <ResponseMessagePlaceholder statusCode={statusCode} data={data} successMessage="Email успешно подтвержден!"/>
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
                <Column>
                    <LoadDataPlaceholder isLoading={isLoading} error={error}></LoadDataPlaceholder>
                </Column>
            </Row>
        </Container>
    </>
}
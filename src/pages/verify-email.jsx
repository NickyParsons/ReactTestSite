import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { GreenMessage, RedMessage, WhiteMessage } from "../components/containedColorMessage.jsx";
//import { useAuthContext } from "../hooks/useAuthContext.jsx";

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
    const navigate = useNavigate();
    //context
    //const authContext = useAuthContext();
    //states
    const [message, setMessage] = React.useState(<></>);
    //effects
    
    React.useLayoutEffect(() => { initPage()}, []);
    //handlers
    function initPage() {
        if (token != null) {
            verifyEmail(token)
        }
    }
    function submitToken(event) {
        event.preventDefault();
        verifyEmail(event.target.token.value);
        
    }
    async function verifyEmail(token) {
        try {
            setMessage(<Container><WhiteMessage text="Loading..." /></Container>);
            let response = await fetch(`/api/verify-email?token=${encodeURIComponent(token)}`, {
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
            <form onSubmit={submitToken}>
                <Row>
                    <Column1>Token:</Column1>
                    <Column2><input name="token" type="text" className="active-input" defaultValue={token}></input></Column2>
                </Row>
                <Row>
                    <Column><button type="submit" className="neon-button">Отправить</button></Column>
                </Row>
            </form>
            {message}
        </Container>
    </>
}
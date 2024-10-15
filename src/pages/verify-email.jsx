import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
//import { AuthContext } from "../hocs/AuthProvider.jsx";
import { GreenMessage, RedMessage } from "../components/containedColorMessage.jsx";

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
    //const authContext = React.useContext(AuthContext);
    //states
    const [message, setMessage] = React.useState(<></>);
    //effects
    
    React.useLayoutEffect(() => { initPage()}, []);
    //handlers
    function initPage() {
        console.log(`token: ${token}`);
        if (token != null) {
            verifyEmail(token)
        }
    }
    function submitToken(event) {
        event.preventDefault();
        verifyEmail(event.target.token.value);
        //console.log(`token in form: ${event.target.token.value}`)
        
    }
    async function verifyEmail(token) {
        try {
            setMessage("Loading...");
            let response = await fetch(`/api/verify-email?token=${token}`, {
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
                //setMessage(getRedMessage("Что то пошло не так"));
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
        <button className="neon-button" onClick={() => { navigate(-1) }}>Назад</button><br />
        <div className="contentContainer">
            <form onSubmit={submitToken}>
                <div className="contentRow">
                    <div className="contentColumn1">Token:</div>
                    <div className="contentColumn2">
                        <input name="token" type="text" className="active-input" defaultValue={token}></input>
                    </div>
                </div>
                <div className="contentRow">
                    <div className="contentColumn">
                        <button type="submit" className="neon-button">Отправить</button>
                    </div>
                </div>
            </form>
            {message}
        </div>
    </>
}
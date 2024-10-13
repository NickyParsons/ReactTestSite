import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { AuthContext } from "../hocs/AuthProvider.jsx";

export default function Test(props) {
    //fields
    const pageTitle = "Подтверждение E-mail";
    const [searchParams, setSearchParams] = useSearchParams();
    //context
    const authContext = React.useContext(AuthContext);
    //states
    const [message, setMessage] = React.useState("");
    //effects
    React.useLayoutEffect(() => {
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }, []);
    React.useLayoutEffect(() => { verifyEmail()}, []);
    //handlers
    async function verifyEmail() {
        try {
            setMessage("Loading...");
            let response = await fetch(`/api/verify-email?token=${searchParams.get("token")}`, {
                method: "POST",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "*/*"
                },
                mode: "cors",
                credentials: "include"
            });
            if (response.status === 200) {
                setMessage("Email успешно подтвержден!");
            }
            else {
                setMessage("Что то пошло не так");
            }
            console.log(`[${response.status}] ${response.statusText}: ${await response.text()}`);
            
        }
        catch (error) {
            setMessage("Что то пошло не так");
            console.log(`Something goes wrong: ${error}`);
        }
    }
    //render
    return <>
        <p>{ message }</p>
    </>
}
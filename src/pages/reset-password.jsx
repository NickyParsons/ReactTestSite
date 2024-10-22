import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { usePostFetchOnTrigger } from "../hooks/useFetchData.js";
import { ResponseMessagePlaceholder, LoadDataPlaceholder } from "../components/fetchPlaceholders.jsx";

export default function ResetPassword(props) {
    //show render count
    // const renderCount = React.useRef(1);
    // React.useEffect(() => { console.log(`Verify email page render count: ${renderCount.current++}`); });
    //page title
    const pageTitle = "Восстановление пароля";
    React.useLayoutEffect(() => {
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }, []);
    //states
    const [isPasswordValid, setPasswordValid] = React.useState(true);
    const [isRepeatPasswordValid, setRepeatPasswordValid] = React.useState(true);
    //fields
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token");
    const {handler, isLoading, statusCode, data, error} = usePostFetchOnTrigger();
    //effects
    function submitToken(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.set("token", event.target.token.value);
        formData.set("password", event.target.password.value);
        handler(`/api/reset-password`, {
            formData: formData
        });
    }
    
    function validatePassword(event){
        const password = event.target.form.password;
        const repeatPassword = event.target.form.repeatPassword;
        if (password.value.length < 6) {
            password.setCustomValidity("Слишком короткий");
        }
        else {
            password.setCustomValidity("");
        }
        if (password.value !== repeatPassword.value) {
            repeatPassword.setCustomValidity("Пароли не совпадают");
        }
        else {
            repeatPassword.setCustomValidity("");
        }
        password.validity.valid ? setPasswordValid(true) : setPasswordValid(false);
        repeatPassword.validity.valid ? setRepeatPasswordValid(true) : setRepeatPasswordValid(false);
    }
    //render
    const passwordClass = isPasswordValid ? "active-input" : "invalid-active-input";
    const repeatPasswordClass = isRepeatPasswordValid ? "active-input" : "invalid-active-input";
    return <>
        <BackButton/>
        <Container>
            <form onSubmit={submitToken}>
                <Row>
                    <Column1>Token:</Column1>
                    <Column2><input name="token" type="text" className="active-input" defaultValue={token} required></input></Column2>
                </Row>
                <Row>
                    <Column1>Новый пароль:</Column1>
                    <Column2><input name="password" type="password" className={passwordClass} onChange={validatePassword} required></input></Column2>
                </Row>
                <Row>
                    <Column1>Подтвердите пароль:</Column1>
                    <Column2><input name="repeatPassword" type="password" className={repeatPasswordClass} onChange={validatePassword} required></input></Column2>
                </Row>
                <Row>
                    <Column><button type="submit" className="neon-button">Отправить</button></Column>
                </Row>
            </form>
            <Row>
                <LoadDataPlaceholder isLoading={isLoading} error={error}>
                    <ResponseMessagePlaceholder statusCode={statusCode} data={data} successMessage="Пароль успешно изменен!"/>
                </LoadDataPlaceholder>
            </Row>
        </Container>
    </>
}
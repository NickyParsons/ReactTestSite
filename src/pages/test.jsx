import React, { useLayoutEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { withAuth } from "../hocs/withAuth.jsx";
import { Container } from "../components/contentContainer.jsx";
import { useFetch, useFetchOnTrigger } from "../hooks/useFetchData.js";
import { ResponseMessagePlaceholder } from "../components/fetchPlaceholders.jsx";


export default withAuth(Test);
//export default Test;
export function Test(props) {
    //show render count
    const renderCount = React.useRef(1);
    React.useEffect(() => { console.log(`Test page render count: ${renderCount.current++}`); });
    //page title
    const pageTitle = "Тестовая страница";
    React.useLayoutEffect(() => {
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }, []);
    //fields
    const {handler, isLoading, statusCode, data, error} = useFetchOnTrigger();
    // const {isLoading, statusCode, data, error} = useFetch("/api/test2", "GET");
    // const {isLoading, statusCode, data, error} = useFetch("/api/verify-email?token=123", "POST");
    //context
    const authContext = useAuthContext();
    //effects
    //handlers
    //render
    return <>
        <p>Props: {props.content}</p>
        <p>Login status: {authContext.isLoggedIn.toString()}</p>
        <p>ID: {authContext.id}</p>
        <p>User: {authContext.email}</p>
        <p>Role: {authContext.role}</p>
        <button onClick={()=>{handler("/api/test2", "GET")}}>TEST FETCH</button><br/>
        {/* <button onClick={()=>{handler("/api/verify-email?token=1222", "POST")}}>TEST FETCH</button><br/> */}
        <ResponseMessagePlaceholder statusCode={statusCode} data={data} successMessage="Что то выполнено успешно)"/>
        <button className="menu-button">Menu button 1</button><hr></hr>
        <button className="menu-button">Menu button 2</button><br />
    </>
}
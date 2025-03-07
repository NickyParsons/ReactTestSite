import React, { useLayoutEffect, version } from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { withAuth } from "../hocs/withAuth.jsx";
import { Container, Row } from "../components/ContentContainer/contentContainer.jsx";
import { useFetch } from "../hooks/useFetchData.js";
import { ResponseMessagePlaceholder } from "../components/fetchPlaceholders.jsx";
import { useElapsedTime } from "../hooks/useTime.js";
import { Spinner } from "../components/_ui/spinner.jsx";
import { DottedDropDownMenu } from "../components/DottedDropDownMenu/dottedDropDownMenu.jsx";
import { CloseButton } from "../components/_ui/closeButton.jsx";
import { LikeButton } from "../components/LikeButton/likeButton.jsx";

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
    const {fetchHandler, isLoading, statusCode, data, error} = useFetch({
        url: "/api/test3",
        method: "GET",
        isResponseJson: true
    });
    const time = useElapsedTime("2024-11-02T13:00:00.000000+00:00");
    //2024-11-03T09:26:30.233447+00:00
    // 1730627786
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
        <p>Moder permissions: {authContext.isModerPermission.toString()}</p>
        <p>Verified: {authContext.isVerified.toString()}</p>
        <p>Elapsed time: {time}</p>
        <button className="menu-button" onClick={()=>{fetchHandler()}}>TEST FETCH</button><br/>
        {/* {data.map((item) => {
            return <li key={item.name}>{item.name}</li>;
        })} */}
        {/* {console.log(data)} */}
        <ResponseMessagePlaceholder isLoading={isLoading} statusCode={statusCode} error={error} successMessage="Что то выполнено успешно)"/>
        <button className="menu-button">Menu button 1</button><br/>
        <button className="menu-button">Menu button 2</button><br />
        <button className="menu-button">Menu button 3</button><br />
        <button className="menu-button" onClick={()=>{authContext.refreshToken()}}>REFRESH FETCH</button><br/>
        <LikeButton likesCount={666} isLiked={true}></LikeButton>
        
        <DottedDropDownMenu windowName="Название окошка">
            <Container>
                <Row><Spinner/></Row>
                <Row>Тут ничего не грузиться,</Row>
                <Row>просто крутиться</Row>
            </Container>
        </DottedDropDownMenu>

    </>
}
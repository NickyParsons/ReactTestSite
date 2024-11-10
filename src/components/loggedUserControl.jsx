import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";
import "../styles/userControl.css";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
export function LoggedUserControl(props) {
    const [isPopUpVisible, setPopUpVisible] = React.useState(false);
    const controlRef = React.useRef();
    const authContext = useAuthContext();
    const navigate = useNavigate();
    function goTo(page){
        setPopUpVisible(false);
        document.body.removeEventListener("click", clickOutside);
        navigate(page);
    }
    const clickOutside = React.useCallback((event) => {
        if (!event.composedPath().includes(controlRef.current)) {
            setPopUpVisible(false);
            document.body.removeEventListener("click", clickOutside);
        }
    } , []);
    function togglePopUpVisibility(event) {
        event.preventDefault();
        if (isPopUpVisible) {
            setPopUpVisible(false);
            document.body.removeEventListener("click", clickOutside);
        }
        else {
            setPopUpVisible(true);
            document.body.addEventListener("click", clickOutside);
        }
    }
    //render
    const popUpWindowClasses = `popUpWindow ${isPopUpVisible ? "windowVisible" : "windowHidden"}`;
    let imageDom;
    if (authContext.userDataFetch.data?.imageUrl != null) {
        imageDom = <img className="user-control-image" src={`/api/${authContext.userDataFetch.data.imageUrl}`}></img>
    }
    else {
        imageDom = <img className="user-control-image" src={`/api/content/profiles/default.png`}></img>
    }
    return <>
        <div className="user-control" ref={controlRef}>
            <a href={"/api/users/" + authContext.id} onClick={togglePopUpVisibility}>
                {imageDom}
            </a>
            <div className={popUpWindowClasses}>
                <Container>
                    <button className="menu-button" onClick={()=>{goTo("/profiles/edit")}}>Редактировать профиль</button>
                    <button className="menu-button" onClick={authContext.signOut}>Выход</button>
                </Container>
                <Row>
                    <Column>
                        <button className="neon-button" onClick={togglePopUpVisibility}>Закрыть</button>
                    </Column>
                </Row>
                
            </div>
        </div>
    </>;
}
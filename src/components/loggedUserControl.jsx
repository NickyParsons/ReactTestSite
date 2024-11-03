import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";
import "../styles/userControl.css";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { useFetch } from "../hooks/useFetchData.js";
export function LoggedUserControl(props) {
    const [image, setImage] = React.useState("content/profiles/default.png");
    const [isPopUpVisible, setPopUpVisible] = React.useState(false);
    const controlRef = React.useRef();
    const authContext = useAuthContext();
    const navigate = useNavigate();
    const profileFetch = useFetch({
        url: `/api/users/${authContext.id}`,
        method: "GET",
        isResponseJson: true,
        onSuccess: (response)=>{
            //НАдо ссылку на картинку тоже хранить в auth контексте, чтобы при ее изменении также и в менюшки она менялась
            if (response.imageUrl != null) {
                setImage(response.imageUrl);
            }
        },
        executeOnLoad: true
    });
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
    return <>
        <div className="user-control" ref={controlRef}>
            <a href={"/api/users/" + authContext.id} onClick={togglePopUpVisibility}>
                <img className="user-control-image" src={`/api/${image}`}></img>
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
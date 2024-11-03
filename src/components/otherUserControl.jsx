import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";
import "../styles/userControl.css";
import { useFetch } from "../hooks/useFetchData.js";
export function OtherUserControl(props) {
    const [image, setImage] = React.useState("content/profiles/default.png");
    const [isPopUpVisible, setPopUpVisible] = React.useState(false);
    const controlRef = React.useRef();
    const authContext = useAuthContext();
    const navigate = useNavigate();
    const profileFetch = useFetch({
        url: `/api/users/${props.id}`,
        method: "GET",
        isResponseJson: true,
        onSuccess: (response)=>{
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
    let nameDom;
    let nameString;
    if (profileFetch.data.firstName == null && profileFetch.data.lastName == null) {
        const mailRegExp = new RegExp("^.*@");
        const result = mailRegExp.exec(profileFetch.data.email);
        if (result != null) {
            nameString = result[0].slice(0, result[0].length-1);
            nameDom = <>
            <span className="user-control-name">{result[0].slice(0, result[0].length-1)}</span>
            </>;
        }
    }
    else{
        nameString = `${profileFetch.data.firstName} ${profileFetch.data.lastName}`;
        nameDom = <>
            <span className="user-control-name">{profileFetch.data.firstName}</span>
            <span className="user-control-name">{profileFetch.data.lastName}</span>
            </>;
    }
    return <>
        <div className="user-control" ref={controlRef}>
            {/* <span className="user-control-name">{nameString}</span> */}
            {nameDom}
            <a href={"/api/users/" + props.id} onClick={togglePopUpVisibility}>
                <img className="user-control-image" src={`/api/${image}`}></img>
            </a>
            <div className={popUpWindowClasses}>
                {/* <button className="menu-button" onClick={()=>{goTo("/profiles/edit")}}>Редактировать профиль</button>
                <button className="menu-button" onClick={authContext.signOut}>Выход</button><br /> */}
                <span>Тут еще ничего нет</span>
                <button className="neon-button" onClick={togglePopUpVisibility}>Закрыть</button>
            </div>
        </div>
    </>;
}
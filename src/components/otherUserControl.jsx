import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";
import "../styles/userControl.css";
export function OtherUserControl(props) {
    const [image, setImage] = React.useState("content/profiles/default.png");
    const [isPopUpVisible, setPopUpVisible] = React.useState(false);
    const controlRef = React.useRef();
    const authContext = useAuthContext();
    const navigate = useNavigate();
    React.useEffect(()=>{
        if (props.user?.imageUrl != null) {
            setImage(props.user.imageUrl);
        }
    }, []);
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
    if (props.user?.firstName == null && props.user?.lastName == null) {
        const mailRegExp = new RegExp("^.*@");
        const result = mailRegExp.exec(props.user?.email);
        if (result != null) {
            nameString = result[0].slice(0, result[0].length-1);
            nameDom = <>
            <span className="user-control-name">{result[0].slice(0, result[0].length-1)}</span>
            </>;
        }
    }
    else{
        nameString = `${props.user?.firstName} ${props.user.lastName}`;
        nameDom = <>
            <span className="user-control-name">{props.user?.firstName}</span>
            <span className="user-control-name">{props.user?.lastName}</span>
            </>;
    }
    return <>
        <div className="user-control" ref={controlRef}>
            {/* <span className="user-control-name">{nameString}</span> */}
            {nameDom}
            <a href={"/api/users/" + props.user?.id} onClick={togglePopUpVisibility}>
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
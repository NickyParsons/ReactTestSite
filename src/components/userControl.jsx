import React from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import "../styles/userControl.css";
export default function UserControl({ id, children }, ...props) {
    //show render count
    // const renderCount = React.useRef(1);
    // React.useEffect(() => { console.log(`User Control (id: ${id}) render count: ${renderCount.current++}`); });
    //fields
    //states
    const [image, setImage] = React.useState("content/profiles/default.png");
    const [isPopUpVisible, setPopUpVisible] = React.useState(false);
    //refs
    const controlRef = React.useRef();
    //context
    const authContext = useAuthContext();
    //effects
    React.useEffect(() => {
        fetchUserData();
    }, []);
    //handlers
    async function fetchUserData() {
        let requestString = `/api/users/${id}`;
        //console.log(`request: ${requestString}`)
        try {
            let response = await fetch(`${requestString}`, {
                method: "GET",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "*/*"
                },
                cache: "no-cache",
                mode: "cors",
                credentials: "include"
            });
            let data = await response.json();
            if (data.imageUrl != "" && data.imageUrl != null) {
                setImage(data.imageUrl);
            }
        }
        catch (error) {
            console.log(`Something goes wrong: ${error}`);
        }
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
    let renderValue = <></>;

    const popUpWindowClasses = `popUpWindow ${isPopUpVisible ? "windowVisible" : "windowHidden"}`;
    renderValue = <div id="userControl" ref={controlRef}>
        <a href={"/api/users/" + id} onClick={togglePopUpVisibility}>
            <img src={`/api/${image}`}></img>
        </a>
        <div className={popUpWindowClasses}>
            {children}
            <button className="neon-button" onClick={togglePopUpVisibility}>Закрыть</button>
        </div>
    </div>;

    return renderValue;
}
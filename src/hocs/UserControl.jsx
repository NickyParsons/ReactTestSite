import React from "react";
import { AuthContext } from "../hocs/AuthProvider.jsx";
import "../styles/userControl.css";
export default function UserControl({ id, children }, ...props) {
    //fields
    //states
    const [image, setImage] = React.useState("content/profiles/default.png");
    const [isPopUpVisible, setPopUpVisible] = React.useState(false);
    //refs
    const renderCount = React.useRef(1);
    //context
    const authContext = React.useContext(AuthContext);
    //effects
    //React.useEffect(() => {
    //    console.log(`User Control [${id}] render count: ${renderCount.current}`);
    //    renderCount.current = renderCount.current + 1;
    //});
    React.useEffect(() => {
        fetchUserData();
    }, []);
    //handlers
    async function fetchUserData() {
        let requestString = `$/api/users/${id}`;
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
    function togglePopUpVisibility(event) {
        event.preventDefault();
        setPopUpVisible(isPopUpVisible ? false : true);
    }
    //render
    let renderValue = <></>;

    const popUpWindowClasses = `popUpWindow ${isPopUpVisible ? "windowVisible" : "windowHidden"}`;
    renderValue = <div id="userControl">
        <a href={"/api/users/" + id} onClick={togglePopUpVisibility}>
            <img src={`/api/${image}`}></img>
        </a>
        <div className={popUpWindowClasses}>
            <span>{children}</span>
            <button className="neon-button" onClick={togglePopUpVisibility}>Закрыть</button>
        </div>
    </div>;

    return renderValue;
}
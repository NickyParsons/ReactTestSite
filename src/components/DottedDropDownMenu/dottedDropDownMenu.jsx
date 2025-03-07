import React from "react";
import { CloseButton } from "../_ui/closeButton.jsx";
import "./dottedDropDownMenu.css";

export function DottedDropDownMenu(props){
    const [isPopUpVisible, setPopUpVisible] = React.useState(false);
    
    const popUpWindowRef = React.useRef();
    const dottedButtonRef = React.useRef();
    
    const toggleWindowVisibility = () => {
        if(isPopUpVisible) {
            setPopUpVisible(false);
            document.body.removeEventListener("click", clickOutside);
        }
        else{
            setPopUpVisible(true);
            document.body.addEventListener("click", clickOutside);
        }
    }
    const clickOutside = React.useCallback((event) => {
        if (!(event.composedPath().includes(popUpWindowRef.current)) && !(event.composedPath().includes(dottedButtonRef.current))) {
            setPopUpVisible(false);
            document.body.removeEventListener("click", clickOutside);
        }
    }, []);

    const popUpWindowClasses = `popUpWindow ${isPopUpVisible ? "windowVisible" : "windowHidden"}`;
    return <>
        <div className="dottedDropDownMenu">
            <div className="dottedDropDownButton" ref={dottedButtonRef} onClick={toggleWindowVisibility}>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
            <div className={popUpWindowClasses} ref={popUpWindowRef}>
                <div className="popUpWindowHeader">
                    <span className="popUpWindowName">{(props.windowName === undefined) ? "props.windowName" : props.windowName}</span>
                    <CloseButton onClick={toggleWindowVisibility}/>
                </div>
                {props.children}
            </div>
        </div>
    </>;
}
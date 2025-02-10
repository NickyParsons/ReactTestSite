import React from "react";
import "../styles/closeButton.css";

export function CloseButton(props){
    return <div className="closeButtonBox" onClick={props.onClick}>
        <div className="closeButtonX1"></div>
        <div className="closeButtonX2"></div>
    </div>
}
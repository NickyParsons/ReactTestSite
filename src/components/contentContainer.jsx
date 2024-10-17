import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/contentContainer.css";

export function Container(props) {
    return <div className="contentContainer">
        {props.children}
    </div>;
}

export function Row(props) {
    return <div className="contentRow">
        {props.children}
    </div>;
}

export function Column(props) {
    return <div className="contentColumn">
        {props.children}
    </div>;
}

export function Column1(props) {
    return <div className="contentColumn1">
        {props.children}
    </div>;
}

export function Column2(props) {
    return <div className="contentColumn2">
        {props.children}
    </div>;
}

export function BackButton() {
    const navigate = useNavigate();
    return <button className="neon-button" onClick={() => { navigate(-1) }}>Назад</button>;
}
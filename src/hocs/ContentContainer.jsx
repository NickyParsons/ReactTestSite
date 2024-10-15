import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/contentContainer.css";

export function Container({ children }, ...props) {
    return <div className="contentContainer">
        {children}
    </div>;
}

export function Row({ children }, ...props) {
    return <div className="contentRow">
        {children}
    </div>;
}

export function Column({ children }, ...props) {
    return <div className="contentColumn">
        {children}
    </div>;
}

export function Column1({ children }, ...props) {
    return <div className="contentColumn1">
        {children}
    </div>;
}

export function Column2({ children }, ...props) {
    return <div className="contentColumn2">
        {children}
    </div>;
}

export function BackButton() {
    const navigate = useNavigate();
    return <button className="neon-button" onClick={() => { navigate(-1) }}>Назад</button>;
}
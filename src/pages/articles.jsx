import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../hocs/AuthProvider.jsx";
  
function Articles(props) {
    //fields
    const pageTitle = "Статьи";
    //context
    let context = useContext(AuthContext);
    //effects
    useEffect(setTitle, []);
    //handlers
    function setTitle() {
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }
    //render
    return <>
        <h3>{pageTitle}</h3>
        <p>Welcome, {context.userName}!</p>
        <Link to="/createArticle" className="textLink">Добавить статью</Link>
    </>;
}
  
export { Articles };
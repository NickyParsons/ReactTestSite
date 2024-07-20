import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../hocs/AuthProvider.jsx";
  
function Articles(props) {
    //fields
    const pageTitle = "Статьи";
    //context
    let authContext = useContext(AuthContext);
    //effects
    useEffect(setTitle, []);
    //handlers
    function setTitle() {
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }
    //render
    let addArticle = <></>;
    if (authContext.isLoggedIn) {
        addArticle = <Link to="/createArticle" className="textLink">Добавить статью</Link>;
    }
    else {
        addArticle = <span>Войдите чтобы добавить статью</span>;
    }
    return <>
        <h3>{pageTitle}</h3>
        <p>Login status: {authContext.isLoggedIn.toString()}</p>
        <p>ID: {authContext.id}</p>
        <p>User: {authContext.email}</p>
        <p>Role: {authContext.role}</p>
        {addArticle}
    </>;
}
  
export { Articles };
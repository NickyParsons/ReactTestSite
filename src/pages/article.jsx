import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";
import ArticleCard from "../components/articleCard.jsx";

import "../styles/articles.css";

export default function Article(props) {
    //fields
    const { articleId } = useParams();
    const navigate = useNavigate();
    //states
    
    //context
    const authContext = useAuthContext();
    //effects
    React.useEffect(() => {
        const pageTitle = "Статья";
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }, []);
    
    //handlers
    const goBack = () => { navigate(-1) };
    //render
    const returnDom = <>
        <button className="neon-button" onClick={goBack}>Назад</button><br/>
        <span>Article {articleId}</span><br />
        <span>Скорее всего отдельная страница это плохая идея, т.к. надо заново грузить информацию о статье. Но это можно сделать, айдишник то есть</span>
    </>;

    return returnDom;
}
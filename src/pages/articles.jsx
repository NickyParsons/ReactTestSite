import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect, useContext, useLayoutEffect } from "react";
import ArticleCard from "../components/articleCard.jsx";
import { AuthContext } from "../hocs/AuthProvider.jsx";
import "../styles/articles.css";

const BASE_URL = "http://localhost:5214";
function Articles(props) {
    //fields
    const pageTitle = "Статьи";
    //states
    const [articles, setArticles] = useState([]);
    const [isLoading, setLoadingState] = useState(false);
    //context
    let authContext = useContext(AuthContext);
    //effects
    useLayoutEffect(setTitle, []);
    useEffect(() => {
        getArticles();
    }, []);
    
    //handlers
    function setTitle() {
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }
    async function getArticles() {
        try {
            const response = await fetch(`${BASE_URL}/articles`, {
                method: "GET",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "*/*"
                },
                mode: "cors",
                credentials: "include"
            });
            if (response.status === 200) {
                const json = await response.json();
                setArticles([...json]);
            }
            else {
                console.log(response.statusText);
            }
        }
        catch (error) {
            console.log(`Something goes wrong: ${error}`);
        }
    }
    //render
    let addArticle = <></>;
    if (authContext.isLoggedIn) {
        addArticle = <Link to="/createArticle" className="navLink">Добавить статью</Link>;
    }
    else {
        addArticle = <span>Войдите чтобы добавить статью</span>;
    }

    let articlesList = articles.map(a => {
        return <h4 key={a.id}>{a.name} {a.description}</h4>;
    });

    return <>
        {addArticle}
        <div id="articleContainer">
            {articles.map((article) => {
                console.log(article);
                return <ArticleCard key={article.id} article={article} />;
            })}
        </div>
    </>;
}
  
export { Articles };
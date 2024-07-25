import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect, useContext, useLayoutEffect } from "react";
import ArticleCard from "../components/articleCard.jsx";
import { AuthContext } from "../hocs/AuthProvider.jsx";
import UserControl from "../components/userControl.jsx";
import "../styles/articles.css";

const BASE_URL = "http://localhost:5214";
function Articles(props) {
    //fields
    const pageTitle = "Статьи";
    //states
    const [articles, setArticles] = useState([]);
    const [isLoading, setLoadingState] = useState(false);
    const [error, setError] = useState();
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
        setLoadingState(true);
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
            setError(error);
        }
        finally {
            setLoadingState(false);
        }
    }
    //render
    let addArticleDom = <></>;
    if (authContext.isLoggedIn) {
        addArticleDom = <Link to="/createArticle" className="navLink">Добавить статью</Link>;
    }
    else {
        addArticleDom = <span>Войдите чтобы добавить статью</span>;
    }
    let articlesDom = <></>;
    if (isLoading) {
        articlesDom = <p>Loading...</p>
    }
    else {
        if (error) {
            articlesDom = <p>{error.toString()}</p>
        }
        else {
            articlesDom = <>
                <div id="articlesContainer">
                    {articles.map((article) => {
                        //console.log(article);
                        return <div className="articleContainer" key={article.id}>
                            <UserControl id={article.authorId} />
                            <ArticleCard article={article} />
                        </div>;
                    })}
                </div>
            </>;
        }
    }
    return <>
        {addArticleDom}
        {articlesDom}
    </>
}
  
export { Articles };
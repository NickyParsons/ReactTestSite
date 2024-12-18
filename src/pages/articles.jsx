import { Link } from "react-router-dom";
import React from "react";
import ArticleCard from "../components/articleCard.jsx";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { OtherUserControl } from "../components/otherUserControl.jsx";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { useFetch } from "../hooks/useFetchData.js";
import { ResponseMessagePlaceholder, LoadDataPlaceholder } from "../components/fetchPlaceholders.jsx";
import { Comments } from "../components/comments.jsx";

import "../styles/articles.css";
function Articles(props) {
    //page title
    const pageTitle = "Статьи";
    React.useLayoutEffect(() => {
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }, []);
    //context
    let authContext = useAuthContext();
    //states
    const {fetchHandler, setData, isLoading, statusCode, data, error} = useFetch({
        url: "/api/articles",
        method: "GET",
        isResponseJson: true,
        executeOnLoad: true
    });
    //handlers
    const refreshArticles = () => {
        fetchHandler({
            onSuccess: (response)=>{
                if ((data?.length != response?.length) ||
                    (data[0].createdAt != response[0].createdAt)
            ) {
                    setData([...response]);
                }
            }
        });
    }
    //render
    //add article
    let addArticleDom = <></>;
    if (authContext.isLoggedIn) {
        if (authContext.isVerified) {
            addArticleDom = <Link to="/articles/new"><button className="neon-button">Добавить статью</button></Link>;
        } else {
            addArticleDom = <span>Подтвердите e-mail чтобы добавить статью</span>;
        }
    } else {
        addArticleDom = <span>Войдите чтобы добавить статью</span>;
    }
    //DOM
    let articlesDom = <>
        <Container>
            <ResponseMessagePlaceholder statusCode={statusCode} error={error} successMessage="Статьи загружены"/>
            <Row><button onClick={refreshArticles}>Обновить записи</button></Row>
            <LoadDataPlaceholder isLoading={isLoading} error={error}>
                {data.map((article) => {
                    return <Row key={article.id}>
                        <Column1>
                            <OtherUserControl user={article.author}/>
                        </Column1>
                        <Column2>
                            <ArticleCard article={article} />
                            <Comments articleId={article.id}/>
                        </Column2>
                    </Row>
                })}
            </LoadDataPlaceholder>
        </Container>
    </>;
    return <>
        {addArticleDom}
        {articlesDom}
    </>
}
  
export { Articles };
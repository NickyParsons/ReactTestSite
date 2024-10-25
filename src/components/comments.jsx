import React from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { useFetch } from "../hooks/useFetchData.js";
import { ResponseMessagePlaceholder, LoadDataPlaceholder } from "../components/fetchPlaceholders.jsx";
import { AddComment } from "../components/addComment.jsx";
import { Comment } from "../components/comment.jsx";
import "../styles/comments.css";

export function Comments(props){
    //context
    let authContext = useAuthContext();
    //states
    const {fetchHandler, setData, isLoading, statusCode, data, error} = useFetch({
        url: `/api/articles/${props.articleId}/comments`,
        method: "GET",
        isResponseJson: true,
        executeOnLoad: true
    });
    //render
    let addCommentDom;
    if (authContext.isLoggedIn) {
        if (authContext.isVerified) {
            addCommentDom = <AddComment articleId={props.articleId} currentData={data} setDataHandler={setData}/>;
        } else {
            addCommentDom = <span>Подтвердите e-mail чтобы добавить комментарий</span>;
        }
    } else {
        addCommentDom = <span>Войдите чтобы добавить комментарий</span>;
    }

    return <>
        <ResponseMessagePlaceholder statusCode={statusCode} data={data} successMessage="Комментарии успешно загружены"/>
        <span>Комментарии:</span>
        <LoadDataPlaceholder isLoading={isLoading} error={error}>
        {data?.map((comment)=>{
            return <Comment key={comment.id} comment={comment} currentData={data} setDataHandler={setData}/>
        })}
        </LoadDataPlaceholder>
        {addCommentDom}
    </>
}
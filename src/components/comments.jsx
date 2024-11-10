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
    const [isShortView, setShortView] = React.useState(true);
    const {fetchHandler, setData, isLoading, statusCode, data, error} = useFetch({
        url: `/api/articles/${props.articleId}/comments`,
        method: "GET",
        isResponseJson: true,
        executeOnLoad: true
    });
    //effect
    React.useEffect(()=>{
        let timer = setInterval(refreshComments, 30000);
        return ()=>{
            clearInterval(timer);
        }
    }, []);
    //handlers
    const refreshComments = () => {
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
    let addCommentDom;
    if (authContext.isLoggedIn) {
        if (authContext.isVerified) {
            addCommentDom = <AddComment articleId={props.articleId} currentData={data} setDataHandler={setData}/>;
        } else {
            addCommentDom = <textarea name="text" className="disabled-input" disabled defaultValue="Подтвердите e-mail чтобы добавить комментарий"></textarea>
        }
    } else {
        addCommentDom = <textarea name="text" className="disabled-input" disabled defaultValue="Войдите чтобы добавить комментарий"></textarea>
    }
    let commentsArray = isShortView ? data.slice(0, 3) : data;
    return <>
        <ResponseMessagePlaceholder statusCode={statusCode} data={data} successMessage="Комментарии успешно загружены"/>
        <span>Комментарии:</span>
        {addCommentDom}
        {/* <LoadDataPlaceholder isLoading={isLoading} error={error}> */}
        {(data.length > 0) && <Row><button onClick={refreshComments}>Обновить</button></Row>}
        {commentsArray?.map((comment)=>{
            return <Comment key={comment.id} comment={comment} currentData={data} setDataHandler={setData}/>
        })}
        {(isShortView && (data.length > 5)) && <Row><button onClick={()=>{setShortView(!isShortView)}}>Показать еще</button></Row>}
        {(data.length > 0) && <Row><button onClick={refreshComments}>Обновить</button></Row>}
        {/* </LoadDataPlaceholder> */}
    </>
}
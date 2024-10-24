import React, { useEffect } from "react";
import UserControl from "../components/userControl.jsx";
import UserMenu from "../components/userMenu.jsx";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { useFetch } from "../hooks/useFetchData.js";
import { ResponseMessagePlaceholder, LoadDataPlaceholder } from "../components/fetchPlaceholders.jsx";
import { AddComment } from "../components/addComment.jsx";

export function Comments(props){
    //states
    const {fetchHandler, setData, isLoading, statusCode, data, error} = useFetch({
        url: `/api/articles/${props.articleId}/comments`,
        method: "GET",
        isResponseJson: true,
        executeOnLoad: true
    });
    //render
    return <>
        <ResponseMessagePlaceholder statusCode={statusCode} data={data} successMessage="Комментарии успешно загружены"/>
        <span>Комментарии:</span>
        <LoadDataPlaceholder isLoading={isLoading} error={error}>
        {data?.map((comment)=>{
            return <Row key={comment.id}>
                        <Column1>
                            <UserControl id={comment.authorId}>
                                <UserMenu></UserMenu>
                            </UserControl>
                        </Column1>
                        <Column2>
                            <span>{comment.text}</span>
                        </Column2>
                    </Row>
        })}
        </LoadDataPlaceholder>
        <AddComment articleId={props.articleId} currentData={data} setDataHandler={setData}/>
    </>
}
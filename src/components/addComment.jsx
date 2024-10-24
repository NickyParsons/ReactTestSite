import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { useFetch } from "../hooks/useFetchData.js";
import { ResponseMessagePlaceholder, LoadDataPlaceholder } from "../components/fetchPlaceholders.jsx";

export function AddComment(props){
    //context
    let authContext = useAuthContext();
    //states
    const {fetchHandler, setData, isLoading, statusCode, data, error} = useFetch({
        url: `/api/articles/${props.articleId}/comments`,
        method: "POST",
        isResponseJson: true,
        executeOnLoad: false,
        // setDataHandler: props.setDataHandler,
        onSuccess: ()=>{
            props.setDataHandler([...props.currentData, data]);
        }
    });
    //handlers
    function submitForm(event){
        event.preventDefault();
        let formData = new FormData();
        formData.append("AuthorId", authContext.id);
        formData.append("Text", event.target.text.value);
        fetchHandler(formData);
    }
    return <>
        <form onSubmit={submitForm}>
        <Row>
            <Column>
                <textarea name="text" className="active-input"></textarea>
            </Column>
        </Row>
        <Row>
            <Column>
                <button type="submit" className="neon-button">Добавить</button>
            </Column>
        </Row>
        <Row>
            <Column>
                <ResponseMessagePlaceholder statusCode={statusCode} data={data} successMessage="Комментарий добавлен"/>
            </Column>
        </Row>
        
        </form>
    </>
    
    
}
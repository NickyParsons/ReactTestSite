import React from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { useFetch } from "../hooks/useFetchData.js";
import { OtherUserControl } from "./otherUserControl.jsx";
import { useElapsedTime } from "../hooks/useTime.js";

export function Comment(props){
    //context
    let authContext = useAuthContext();
    //fields
    //states
    const [isEdit, setEdit] = React.useState(false);
    const deleteFetch = useFetch({
        url: `/api/comments/${props.comment.id}/delete`,
        method: "POST",
        isResponseJson: true,
        executeOnLoad: false,
        onSuccess: (response)=>{
            props.setDataHandler(props.currentData.filter((comment)=>comment.id != response.id));
        }
    });
    const editFetch = useFetch({
        url: `/api/comments/${props.comment.id}/edit`,
        method: "POST",
        isResponseJson: true,
        executeOnLoad: false,
        onSuccess: (response)=>{
            const editedArray = props.currentData.map((comment) =>{
                if (comment.id == response.id) {
                    return response;
                } else {
                    return comment;
                }
            });
            props.setDataHandler(editedArray);
            setEdit(false);
        }
    });
    //handlers
    function deleteComment(){
        let form = new FormData();
        form.append("authorId", authContext.id);
        deleteFetch.fetchHandler({formData: form});
    }
    function editComment(event){
        event.preventDefault();
        let form = new FormData();
        form.append("AuthorId", authContext.id);
        form.append("Text", event.target.newText.value);
        editFetch.fetchHandler({formData: form});
    }
    //render
    let isAllowedToEdit = (props.comment.authorId == authContext.id) || authContext.isModerPermission;
    let textCommentDom;
    if (isEdit) {
        textCommentDom = <>
        <form onSubmit={editComment}>
            <textarea name="newText" defaultValue={props.comment.text} className="active-input"/>
            <button type="submit" className="neon-button">Редактировать</button>
            <button className="neon-button" onClick={() => setEdit(false)}>Отменить</button>
        </form>
        </>;
    } else {
        textCommentDom = <span>{props.comment.text}</span>;
    }
    //DOM
    const commentCreatedTime = useElapsedTime(props.comment.updatedAt == null ? props.comment.createdAt : props.comment.updatedAt);
    return <>
        <Row key={props.comment.id}>
            <Column1>
                <OtherUserControl user={props.comment.author}/>
            </Column1>
            <Column2>
                <div className="comment-card">
                    <div className="comment-card-header">
                        <span className="comment-card-added-time">{props.comment.updatedAt == null ? `Создан: ${commentCreatedTime}` : `Изменен: ${commentCreatedTime}`}</span>
                    </div>
                    <div className="comment-card-body">
                        {(isAllowedToEdit) && <button className="neon-button comment-card-button"onClick={()=>{setEdit(!isEdit)}}>Редактировать</button>}
                        {(isAllowedToEdit) && <button className="neon-button comment-card-button" onClick={deleteComment}>Удалить</button>}
                        {textCommentDom}
                    </div>
                    
                </div>
            </Column2>
        </Row>
    </>
}
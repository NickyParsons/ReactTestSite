import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useElapsedTime } from "../hooks/useTime.js";
import { useFetch } from "../hooks/useFetchData.js";
import { LikeButton } from "../components/LikeButton/likeButton.jsx";
export default function ArticleCard(props) {
    //context
    const authContext = useAuthContext();
    
    
    //refs
    const textRef = React.useRef("");
    if (props.article.text != null) {
        textRef.current = props.article.text.slice(0, 10);
    }
    //states
    const [isShowMore, setShowMore] = React.useState(false);
    const [likesCount, updateLikesCount] = useState(props.article.likedBy.length);
    const [isLiked, setIsLiked] = useState(props.article.likedBy.some(x => x.id == authContext.id));
    //likeFetch
    const likeFetch = useFetch({
        url: `/api/articles/${props.article.id}/like`,
        method: "POST",
        isResponseJson: true,
        executeOnLoad: false
    });
    //handlers
    function toggleShowMore(event) {
        event.preventDefault();
        isShowMore ? setShowMore(false) : setShowMore(true);
    }
    //
    const likeArticle = () =>{
        let formData = new FormData();
        formData.append("UserId", authContext.id);
        console.log(`ID: ${authContext.id}`);
        likeFetch.fetchHandler({
            formData: formData,
            queryData: undefined,
            onSuccess: (data)=>{
                updateLikesCount(data.likedBy.length);
                setIsLiked(!isLiked);
            }
        });
    }
    //render
    let image = <></>;
    if (props.article.imageUrl) {
        image = <img src={`/api/${props.article.imageUrl}`}></img>
    }

    const articleLink = `/articles/${props.article.id}`;

    let text = <></>;
    if (isShowMore) {
        text = props.article.text;
    }
    else {
        if (props.article.text != null) {
            const shortSize = 200;
            if (props.article.text.length > shortSize) {
                text = <>
                    {props.article.text.slice(0, shortSize) + "... "}
                    <a onClick={toggleShowMore}>показать еще</a>
                </>;
            }
            else {
                text = props.article.text;
            }
        }
        else {
            text = props.article.text;
        }
    }
    const articleCreatedTime = useElapsedTime(props.article.updatedAt == null ? props.article.createdAt : props.article.updatedAt);
    //render
    return <div className="articleCard">
        <div className="articleCardHeader">
            <Link to={articleLink} className="articleName">{props.article.name}</Link>
            <span className="addedTime">{props.article.updatedAt == null ? `Создана: ${articleCreatedTime}` : `Изменена: ${articleCreatedTime}`}</span>
        </div>
        <div className="articleCardDescription">
            {image}
            <p>{props.article.description}</p>
        </div>
        <div className="articleCardText">
            <p>{text}</p>
        </div>
        <div className="articleCardLikeButton"><LikeButton isLiked={isLiked} likesCount={likesCount} likeHandler={likeArticle}></LikeButton></div>
    </div>;
}
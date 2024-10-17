import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";
export default function ArticleCard(props) {
    //fields
    //refs
    const textRef = React.useRef("");
    if (props.article.text != null) {
        textRef.current = props.article.text.slice(0, 10);
    }
    //states
    const [isShowMore, setShowMore] = React.useState(false);
    //context
    const authContext = useAuthContext();
    //effects
    //handlers
    function toggleShowMore(event) {
        event.preventDefault();
        isShowMore ? setShowMore(false) : setShowMore(true);
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
    return <div className="articleCard">
        <div className="articleCardHeader">
            <Link to={articleLink} className="articleName">{props.article.name}</Link>
            <span className="addedTime">Добавлено: {props.article.createdAt}</span>
        </div>
        <div className="articleCardDescription">
            {image}
            <p>{props.article.description}</p>
        </div>
        <div className="articleCardText">
            <p>{text}</p>
        </div>
    </div>;
}
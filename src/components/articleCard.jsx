import React from "react";
import { Link } from "react-router-dom";
const BASE_URL = "http://localhost:5214";
export default function ArticleCard(props) {
    //fields
    //states
    //context
    //effects
    //handlers
    //render
    let image = <></>;
    if (props.article.imageUrl) {
        image = <img src={`${BASE_URL}/${props.article.imageUrl}`}></img>
    }
    const articleLink = `/articles/${props.article.id}`;
    return <div className="articleCard">
        <div className="articleCardHeader">
            <Link to={articleLink} className="articleName">{props.article.name}</Link>
            <span className="addedTime">Добавлено: {props.article.createdAt}</span>
        </div>
        <div className="articleCardContent">
            {image}
            <p>{props.article.description}</p>
        </div>
        
        
    </div>;
}
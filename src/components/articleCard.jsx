import React from "react";
const BASE_URL = "http://localhost:5214";
export default function ArticleCard(props) {
    //fields
    //states
    //context
    //effects
    //handlers
    //render
    return <div className="articleCard">
        <p>{props.article.name}</p>
        <p>{props.article.description}</p>
        <img src={`${BASE_URL}/${props.article.imageUrl}`}></img>
    </div>;
}
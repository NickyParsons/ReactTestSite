import React from "react";
import { LikeIcon } from "./likeIcon.jsx";
import "./likeButton.css"

export function LikeButton(props){
    return <div className="likeButton">
      <span className="likeButtonText">{props.likesCount}</span><LikeIcon isLiked={props.isLiked} likeHandler={props.likeHandler}></LikeIcon>
    </div>
    
}
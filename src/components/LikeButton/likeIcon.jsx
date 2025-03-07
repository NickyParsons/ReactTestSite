import React from "react";

export function LikeIcon(props){
  let likeIconClasses = props.isLiked ? "likeIcon iconLiked" : "likeIcon iconUnliked";
  return <svg
        className="likeSvg"
        width="128"
        height="128"
        viewBox="0 0 33.86 33.86"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        onClick={props.likeHandler}
    >
    <g>
      <path
        className={likeIconClasses}
        fill="none"
        stroke="#000"
        strokeWidth="3"
        strokeDasharray="none"
        d="m 16.933334,9.5935589 c -7.2255003,-11.586555 -27.190492,0.1072652 0,19.1211441 27.19049,-19.0138799 7.2255,-30.7076994 0,-19.1211441 z"
          />
    </g>
</svg>
}
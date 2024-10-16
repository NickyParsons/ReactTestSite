import React from "react";

const RedMessage = ({ text }) => {
    return <div className="contentRow">
        <div className="contentColumn">
            <span className="red-text">{text}</span>
        </div>
    </div>
}

const GreenMessage = ({text}) => {
    return <div className="contentRow">
        <div className="contentColumn">
            <span className="green-text">{text}</span>
        </div>
    </div>
}

const WhiteMessage = ({ text }) => {
    return <div className="contentRow">
        <div className="contentColumn">
            <span className="white-text">{text}</span>
        </div>
    </div>
}

export { RedMessage, GreenMessage, WhiteMessage }
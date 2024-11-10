import React from "react";
import "../styles/responseMessagePlaceHolder.css";
export function ResponseMessagePlaceholder({statusCode, error, successMessage}, ...props) {
    if (statusCode != null && statusCode != undefined) {
        //  console.log(`Placeholder: ${statusCode}`)
        let message;
        let codeStyle = "fault-code";
        if (statusCode === 200) {
            message = `${successMessage}`;
            codeStyle = "success-code";
        } 
        else if (statusCode === 401) message = `Вы не авторизованы!`;
        else if (statusCode === 502) message = `Ошибка сервера`;
        else message = `Произошла непредвиденная ошибка`;
        if (error !== undefined) {
            console.log(`Ошибка: ${error}`);
        }
        return <>
                <div className="responseMessagePlaceholder">
                    <div className={codeStyle}>[{statusCode}] {message}</div>
                </div>
            </>;
    }
}

export function LoadDataPlaceholder({isLoading, error, children}) {
    let showData;
    if(isLoading){
        showData = <span>Пожалуйста подождите...</span>
    } else {
        if (error != undefined) {
            console.log(error);
            showData = <span>В процессе обработки запроса произошла ошибка!</span>;
        } else {
            showData = children;
        }
    }
    return showData;
}
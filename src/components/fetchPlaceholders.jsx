import React from "react";
import { Spinner } from "../components/spinner.jsx";
import "../styles/responseMessagePlaceHolder.css";
export function ResponseMessagePlaceholder({isLoading, statusCode, error, successMessage}, ...props) {
    const placeholderDivRef = React.useRef();
    const timerRef = React.useRef();
    let codeStyle = "responseMessagePlaceholderHidden";
    let message = "";
    let timer;
    //effects
    React.useEffect(()=>{
        return ()=>{
            clearInterval(timerRef.current);
        }
    }, []);
    //handlers
    const hidePlaceholder = React.useCallback(()=> {
        if(placeholderDivRef.current != null){
            placeholderDivRef.current.className = "responseMessagePlaceholderHidden";
        }
    });
    //render
    if (isLoading) {
        codeStyle = "responseMessagePlaceholderHidden";
    }
    else{
        if(statusCode !== undefined){
            codeStyle = "responseMessagePlaceholderFault";
            if (statusCode === 200) {
                message = `${successMessage}`;
                codeStyle = "responseMessagePlaceholderSuccess";
            }
            else if (statusCode === 401) message = `Вы не авторизованы!`;
            else if (statusCode === 502) message = `Ошибка сервера`;
            else message = `Произошла непредвиденная ошибка`;
        }
        if (error !== undefined) {
            console.log(`Ошибка: ${error}`);
        }
        timerRef.current = setTimeout(()=>{hidePlaceholder()}, 2000);
    }
    return <>
            <div className="responseMessagePlaceholder">
                <div ref={placeholderDivRef} className={codeStyle} onClick={hidePlaceholder}>[{statusCode}] {message}</div>
            </div>
        </>;
}

export function LoadDataPlaceholder({isLoading, error, children}) {
    let showData;
    if(isLoading){
        showData = <div className="loadingContent"><Spinner/></div>;
    } else {
        if (error !== undefined) {
            console.log(error);
            showData = <span>В процессе обработки запроса произошла ошибка!</span>;
        } else {
            showData = <div className="loadedContent">{children}</div>;
        }
    }
    return showData;
}
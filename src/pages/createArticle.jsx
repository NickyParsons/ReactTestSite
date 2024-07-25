import React, { useState, useRef, useEffect, useContext, useLayoutEffect } from "react";
import { AuthContext } from "../hocs/AuthProvider.jsx";
import "../styles/createArticle.css";

function CreateArticle(props) {
    //fields
    const pageTitle = "Создание новой статьи";
    //refs
    //context
    const authContext = useContext(AuthContext);
    //states
    //effects
    useLayoutEffect(setTitle, []);
    //handlers
    function setTitle() {
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }
    async function submitForm(event) {
        event.preventDefault();
        let form = event.target;
        let data = new FormData();
        data.append("name", form.name.value);
        data.append("description", form.description.value);
        data.append("text", form.text.value);
        data.append("image", form.image.files[0]);
        data.append("AuthorId", authContext.id);
        let hostString = `http://localhost:5214/articles/new`;
        try {
            let response = await fetch(`${hostString}`, {
                method: "POST",
                headers: {
                    "Accept": "*/*"
                },
                body: data,
                cache: "no-cache",
                mode: "cors",
                credentials: "include"
            });
            console.log(`${response.status} ${response.statusText}`);
        }
        catch (error) {
            console.log(`Something goes wrong: ${error}`);
        }

    }
    function onTextAreaChange(event) {
        const textArea = event.target
        let scrollHeight = textArea.scrollHeight;
        textArea.style.height = `${scrollHeight+4}px`;
    }
    //render
    return <>
        <form encType="multipart/form-data" method="POST" onSubmit={submitForm} id="createArticleForm">
            <div className="formRow">
                <label htmlFor="name">Заголовок:</label>
                <textarea placeholder="Введите название" id="name" rows="1" className="input" onChange={onTextAreaChange} required></textarea>
            </div>
            <div className="formRow">
                <label htmlFor="description">Подзаголовок:</label>
                <textarea placeholder="Введите краткое описание" id="description" rows="3" className="input" onChange={onTextAreaChange}></textarea>
            </div>
            <div className="formRow">
                <label htmlFor="image">Изображение:</label>
                <input type="file" id="image" className="input"></input>
            </div>
            <div className="formRow">
                <label htmlFor="text">Текст статьи:</label>
                <textarea placeholder="Введите текст статьи" id="text" rows="10" className="input" onChange={onTextAreaChange}></textarea>
            </div>
            <div className="formRow">
                <button type="submit">Отправить</button>
            </div>
        </form>
    </>;
}
  
export { CreateArticle };
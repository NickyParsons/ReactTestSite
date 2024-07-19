import React, { useState, useRef, useEffect } from "react";
import "../styles/createArticle.css"
  
function CreateArticle(props) {
    //fields
    const pageTitle = "Создание новой статьи";
    //refs
    //states
    //effects
    useEffect(setTitle, []);
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
    function onNameChange(event) {
    }
    function onFileChange(event) {
    }
    //render
    return <>
        <form encType="multipart/form-data" method="POST" onSubmit={submitForm} id="createArticleForm">
            <div className="formRow">
                <label htmlFor="name">Заголовок:</label>
                <input type="text" id="name" onChange={onNameChange}></input>
            </div>
            <div className="formRow">
                <label htmlFor="description">Подзаголовок:</label>
                <input type="text" id="description"></input>
            </div>
            <div className="formRow">
                <label htmlFor="image">Изображение:</label>
                <input type="file" id="image" onChange={onFileChange}></input>
            </div>
            <div className="formRow">
                <label htmlFor="text">Текст статьи:</label>
                <input type="text" id="text"></input>
            </div>
            <input type="submit" value="Отправить"></input>
        </form>
    </>;
}
  
export { CreateArticle };
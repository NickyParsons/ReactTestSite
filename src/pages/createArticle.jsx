import React, {useContext, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../hocs/AuthProvider.jsx";
import "../styles/forms.css";

function CreateArticle(props) {
    //fields
    const navigate = useNavigate();
    //refs
    //context
    const authContext = useContext(AuthContext);
    //states
    //effects
    React.useEffect(() => {
        const pageTitle = "Создание новой статьи";
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }, []);
    //handlers
    async function submitForm(event) {
        event.preventDefault();
        let form = event.target;
        let data = new FormData();
        data.append("name", form.name.value);
        data.append("description", form.description.value);
        data.append("text", form.text.value);
        data.append("image", form.image.files[0]);
        data.append("AuthorId", authContext.id);
        try {
            let response = await fetch(`/api/articles/new`, {
                method: "POST",
                headers: {
                    "Accept": "*/*"
                },
                body: data,
                cache: "no-cache",
                mode: "cors",
                credentials: "include"
            });
            navigate("/");
        }
        catch (error) {
            console.log(`Something goes wrong: ${error}`);
        }
    }
    const goBack = () => { navigate(-1) };
    function onTextAreaChange(event) {
        const textArea = event.target
        let scrollHeight = textArea.scrollHeight;
        textArea.style.height = `${scrollHeight+4}px`;
    }
    //render
    return <>
        <button className="neon-button" onClick={goBack}>Назад</button>
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
                <input type="file" id="image" className="input" accept="image/*"></input>
            </div>
            <div className="formRow">
                <label htmlFor="text">Текст статьи:</label>
                <textarea placeholder="Введите текст статьи" id="text" rows="10" className="input" onChange={onTextAreaChange}></textarea>
            </div>
            <div className="formRow">
                <button type="submit" className="neon-button">Отправить</button>
            </div>
        </form>
    </>;
}
  
export { CreateArticle };
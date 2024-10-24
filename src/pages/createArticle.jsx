import React from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { withVerified } from "../hocs/withVerified.jsx";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { usePostFetchOnTrigger } from "../hooks/useFetchData.js";
import { ResponseMessagePlaceholder, LoadDataPlaceholder } from "../components/fetchPlaceholders.jsx";

export default withVerified(CreateArticle);
function CreateArticle(props) {
    //page title
    const pageTitle = "Создание новой статьи";
    React.useLayoutEffect(() => {
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }, []);
    //fields
    //refs
    //context
    const authContext = useAuthContext();
    //states
    const {handler, isLoading, statusCode, data, error} = usePostFetchOnTrigger();
    //effects
    //handlers
    async function submitForm(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append("name", event.target.name.value);
        formData.append("description", event.target.description.value);
        formData.append("text", event.target.text.value);
        formData.append("image", event.target.image.files[0]);
        formData.append("AuthorId", authContext.id);
        handler("/api/articles/new", {
            formData: formData
        });
    }
    function onTextAreaChange(event) {
        const textArea = event.target
        let scrollHeight = textArea.scrollHeight;
        textArea.style.height = `${scrollHeight+4}px`;
    }
    //render
    return <>
        <BackButton/>
        <Container>
            <form encType="multipart/form-data" onSubmit={submitForm}>
            <Row>
                <Column1>Заголовок:</Column1>
                <Column2>
                <textarea placeholder="Введите название" name="name" rows="1" className="active-input" onChange={onTextAreaChange} required></textarea>
                </Column2>
            </Row>
            <Row>
                <Column1>Подзаголовок:</Column1>
                <Column2>
                <textarea placeholder="Введите краткое описание" name="description" rows="3" className="active-input" onChange={onTextAreaChange}></textarea>
                </Column2>
            </Row>
            <Row>
                <Column1>Изображение:</Column1>
                <Column2>
                <input type="file" name="image" accept="image/*" className="active-input"></input>
                </Column2>
            </Row>
            <Row>
                <Column1>Текст статьи:</Column1>
                <Column2>
                <textarea placeholder="Введите текст статьи" name="text" rows="10" className="active-input" onChange={onTextAreaChange}></textarea>
                </Column2>
            </Row>
            <Row>
                <Column><button type="submit" className="neon-button">Отправить</button></Column>
            </Row>
            </form>
            <LoadDataPlaceholder isLoading={isLoading} error={error}>
                    <ResponseMessagePlaceholder statusCode={statusCode} data={data} successMessage="Успешно опубликована"/>
            </LoadDataPlaceholder>
        </Container>
    </>;
}
  
export { CreateArticle };
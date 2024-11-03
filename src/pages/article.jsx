import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";
import ArticleCard from "../components/articleCard.jsx";
import { Comments } from "../components/comments.jsx";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { useFetch } from "../hooks/useFetchData.js";
import { ResponseMessagePlaceholder, LoadDataPlaceholder } from "../components/fetchPlaceholders.jsx";

export default function Article(props) {
    //fields
    const { articleId } = useParams();
    const navigate = useNavigate();
    //page title
    const pageTitle = `Запись ${articleId}`;
    React.useLayoutEffect(() => {
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }, []);
    //context
    const authContext = useAuthContext();
    //states
    const [isEditMode, setEditMode] = React.useState(false);
    const getFetch = useFetch({
        url: `/api/articles/${articleId}`,
        method: "GET",
        isResponseJson: true,
        // onSuccess: undefined,
        executeOnLoad: true
    });
    const editFetch = useFetch({
        url: `/api/articles/${articleId}/edit`,
        method: "POST",
        isResponseJson: true,
        onSuccess: (response)=>{
            getFetch.setData(response);
        },
        executeOnLoad: false
    });
    //effects
    //handlers
    function onTextAreaChange(event) {
        event.target.style.height = `${event.target.scrollHeight+4}px`;
    }
    function editArticle(event){
        event.preventDefault();
        let formData = new FormData();
        formData.append("Name", event.target.name.value);
        formData.append("Description", event.target.description.value);
        formData.append("Text", event.target.text.value);
        formData.append("AuthorId", authContext.id);
        if (event.target.image.files.length > 0) {
            formData.append("image", event.target.image.files[0]);
        }
        editFetch.fetchHandler(formData);
        setEditMode(false);
    }
    //render
    let isAllowedToEdit = (getFetch.data.authorId == authContext.id) || authContext.isModerPermission;
    
    let articleDom;
    if(isEditMode){
        articleDom = <>
        <form encType="multipart/form-data" onSubmit={editArticle}>
        <Row>
            <Column1>
            ID:
            </Column1>
            <Column2>
                <input disabled className="disabled-input" defaultValue={getFetch.data.id}></input>
            </Column2>
        </Row>
        <Row>
            <Column1>
            Заголовок:
            </Column1>
            <Column2>
                <textarea  name="name" rows="1" className="active-input" defaultValue={getFetch.data.name} onChange={onTextAreaChange} required></textarea>
            </Column2>
        </Row>
        <Row>
            <Column1>
            Подзаголовок:
            </Column1>
            <Column2>
                <textarea defaultValue={getFetch.data.description} name="description" rows="3" className="active-input" onChange={onTextAreaChange}></textarea>
            </Column2>
        </Row>
        <Row>
            <Column1>
            Изображение:
            </Column1>
            <Column2>
            <input type="file" name="image" accept="image/*" className="active-input"></input>
            </Column2>
        </Row>
        <Row>
            <Column1>
            Текст статьи:
            </Column1>
            <Column2>
                <textarea defaultValue={getFetch.data.text} name="text" rows="10" className="active-input" onChange={onTextAreaChange}></textarea>
            </Column2>
        </Row>
        <Row>
            <Column><button type="submit" className="neon-button">Отправить</button></Column>
        </Row>
        {/* <LoadDataPlaceholder isLoading={isLoading} error={error}>
            <ResponseMessagePlaceholder statusCode={statusCode} data={data} successMessage="Успешно опубликована"/>
        </LoadDataPlaceholder> */}
        </form>
        </>;
    } else {
        articleDom = <>
        <Row>
            <Column><span>{getFetch.data.name}</span></Column>
        </Row>
        <Row>
            <Column1>Опубликовано:</Column1>
            <Column2><span>{getFetch.data.createdAt}</span></Column2>
        </Row>
        {(getFetch.data.updatedAt != null) && <>
            <Row>
            <Column1>Изменено:</Column1>
            <Column2><span>{getFetch.data.updatedAt}</span></Column2>
            </Row>
        </>}
        <Row>
            {(getFetch.data.imageUrl != null) && <img className="articleImage" src={`/api/${getFetch?.data?.imageUrl}`}></img>}
        </Row>
        <Row>
            <Column><span>{getFetch.data.description}</span></Column>
        </Row>
        <Row>
            <Column><span>{getFetch.data.text}</span></Column>
        </Row>
        </>
    }
    const returnDom = <>
        <BackButton/>
        <Container>
            <ResponseMessagePlaceholder statusCode={getFetch.statusCode} data={getFetch.data} successMessage="Запись загружена"/>
            {(isAllowedToEdit) && <button className="neon-button" onClick={()=>{setEditMode(!isEditMode)}}>Редактировать</button>}
            <LoadDataPlaceholder isLoading={getFetch.isLoading} error={getFetch.error}>
                {articleDom}
                <Comments articleId={getFetch.data.id}/>
            </LoadDataPlaceholder>
        </Container>
    </>;

    return returnDom;
}
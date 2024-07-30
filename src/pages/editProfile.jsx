import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../hocs/AuthProvider.jsx";
import "../styles/forms.css";

export default function EditProfile(props) {
    //fields
    const navigate = useNavigate();
    //refs
    let renderCount = React.useRef(1);
    //context
    const authContext = React.useContext(AuthContext);
    //states
    const [userState, setUser] = React.useState({});
    //effects
    React.useEffect(() => {
        const pageTitle = `Редактирование профиля`;
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }, []);
    React.useEffect(() => {
        fetchUserData();
    }, []);
    React.useEffect(() => {
        console.log(`Edit profile page render count: ${renderCount.current}`);
        renderCount.current = renderCount.current + 1;
    });
    //handlers
    const goBack = () => { navigate(-1) };
    
    async function fetchUserData() {
        let requestString = `${authContext.BACKEND_URL}/users/${authContext.id}`;
        //console.log(`request: ${requestString}`)
        try {
            let response = await fetch(`${requestString}`, {
                method: "GET",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "*/*"
                },
                cache: "no-cache",
                mode: "cors",
                credentials: "include"
            });
            setUser(await response.json());
        }
        catch (error) {
            console.log(`Something goes wrong: ${error}`);
        }
    }
    async function submitForm(event) {
        event.preventDefault();
        let form = event.target;
        let data = new FormData();
        data.append("id", authContext.id);
        data.append("email", authContext.email);
        data.append("firstName", form.firstName.value);
        data.append("lastName", form.lastName.value);
        if (form.userPhoto.files.length > 0) {
            data.append("image", form.userPhoto.files[0]);
        }
        if (form.userNewPassword.value.length > 0) {
            data.append("isPasswordChanging", true);
            data.append("newPassword", form.userNewPassword.value);
            data.append("oldPassword", form.userOldPassword.value);
        }
        else {
            data.append("isPasswordChanging", false);
        }
        try {
            let response = await fetch(`${authContext.BACKEND_URL}/users/${authContext.id}/edit`, {
                method: "POST",
                headers: {
                    "Accept": "*/*"
                },
                body: data,
                cache: "no-cache",
                mode: "cors",
                credentials: "include"
            });
            setUser(await response.json());
        }
        catch (error) {
            console.log(`Something goes wrong: ${error}`);
        }
    }
    //render
    let imageDom = <></>;
    if (userState.imageUrl != "" && userState.imageUrl != null) {
        imageDom = <img src={`${authContext.BACKEND_URL}/${userState.imageUrl}`}></img>
    }
    else <p>Нет фото профиля</p>;
    const returnDom = <>
        <button className="neon-button" onClick={goBack}>Назад</button>

        <form encType="multipart/form-data" method="POST" onSubmit={submitForm}>
            <p>Служебная информация</p>
            <div className="formRow">
                <label htmlFor="userId">ID:</label>
                <input name="userId" id="userId" type="text" className="input" defaultValue={userState.id} required readOnly></input>
            </div>
            <div className="formRow">
                <label htmlFor="userEmail">E-Mail:</label>
                <input name="userEmail" id="userEmail" type="text" className="input" defaultValue={userState.email} required readOnly></input>
            </div>
            <div className="formRow">
                <label htmlFor="userRole">Роль:</label>
                <input name="userRole" id="userRole" type="text" className="input" defaultValue={userState.roleId} required readOnly></input>
            </div>
            <p>Общая информация</p>
            <div className="formRow">
                <label htmlFor="firstName">Имя:</label>
                <input name="firstName" id="firstName" type="text" className="input" defaultValue={userState.firstName}></input>
            </div>
            <div className="formRow">
                <label htmlFor="lastName">Фамилия:</label>
                <input name="lastName" id="lastName" type="text" className="input" defaultValue={userState.lastName}></input>
            </div>
            <p>Фото профиля</p>
            <div className="formRow">
                {imageDom}
            </div>
            <div className="formRow">
                <label htmlFor="userPhoto">Изображение:</label>
                <input type="file" name="userPhoto" id="userPhoto" className="input" accept="image/*"></input>
            </div>
            <p>Смена пароля</p>
            <div className="formRow">
                <label htmlFor="userNewPassword">Новый пароль:</label>
                <input name="userNewPassword" id="userNewPassword" type="text" className="input"></input>
            </div>
            <div className="formRow">
                <label htmlFor="userRepeatPassword">Повторите пароль:</label>
                <input name="userRepeatPassword" id="userRepeatPassword" type="text" className="input"></input>
            </div>
            <div className="formRow">
                <label htmlFor="userOldPassword">Введите текущий пароль:</label>
                <input name="userOldPassword" id="userOldPassword" type="text" className="input"></input>
            </div>
            <div className="formRow">
                <button type="submit" className="neon-button">Отправить</button>
            </div>
        </form>
    </>;

    return returnDom;
}
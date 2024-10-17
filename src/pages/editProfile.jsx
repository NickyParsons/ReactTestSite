import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { withAuth } from "../hocs/withAuth.jsx";

export default withAuth(EditProfile);
export function EditProfile(props) {
    //show render count
    const renderCount = React.useRef(1);
    React.useEffect(() => {console.log(`Edit profile page render count: ${renderCount.current++}`);});
    //fields
    const navigate = useNavigate();
    //refs
    //context
    const authContext = useAuthContext();
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
    //handlers
    async function fetchUserData() {
        let requestString = `/api/users/${authContext.id}`;
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
            let response = await fetch(`/api/users/${authContext.id}/edit`, {
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
    //profile image
    let imageDom;
    if (userState?.imageUrl != "" && userState.imageUrl != null) {
        imageDom = <>
            <div className="contentRow">
                <div className="contentColumn">
                    <img id="profilePhoto" src={`/api/${userState.imageUrl}`}></img>
                </div>
            </div>
        </>;
    //verified email check
    }
    let verifiedEmailDom;
    if (userState?.verifiedAt == null) {
        verifiedEmailDom = <>
            <div className="contentRow">
                <div className="contentColumn">
                    <span className="red-text">Ваш E-mail не подтвержден!</span>
                </div>
            </div>
            <div className="contentRow">
                <div className="contentColumn">
                    <button className="neon-button" onClick={() => { navigate("/verify-email") } }>Подтвердить</button>
                </div>
            </div>
        </>;
    }
    else {
        verifiedEmailDom = <>
            <div className="contentRow">
                <div className="contentColumn">
                    <span className="green-text">Ваш E-mail подтвержден!</span>
                </div>
            </div>
        </>;
    }
    //DOM
    return <>
        <button className="neon-button" onClick={() => { navigate(-1)}}>Назад</button><br />
        <div className="contentContainer">
            {imageDom}
            <div className="contentRow">
                <div className="contentColumn1">ID:</div>
                <div className="contentColumn2">
                    <input type="text" className="disabled-input" defaultValue={userState?.id} disabled></input>
                </div>
            </div>
            <div className="contentRow">
                <div className="contentColumn1">Роль:</div>
                <div className="contentColumn2">
                    <input type="text" className="disabled-input" defaultValue={userState?.role?.description} disabled></input>
                </div>
            </div>
            <div className="contentRow">
                <div className="contentColumn1">E-mail:</div>
                <div className="contentColumn2">
                    <input type="text" className="disabled-input" defaultValue={userState?.email} disabled></input>
                </div>
            </div>
            {verifiedEmailDom}
            <div className="contentRow">
                <div className="contentColumn">
                    <button className="neon-button" onClick={() => { navigate("/change-email")}}>Изменить e-mail</button>
                </div>
            </div>
            <br />

            <form encType="multipart/form-data" method="POST" onSubmit={submitForm }>
                <div className="contentRow">
                    <div className="contentColumn1">Имя:</div>
                    <div className="contentColumn2">
                        <input type="text" name="firstName" className="active-input" defaultValue={userState?.firstName}></input>
                    </div>
                </div>
                <div className="contentRow">
                    <div className="contentColumn1">Фамилия:</div>
                    <div className="contentColumn2">
                        <input type="text" name="lastName" className="active-input" defaultValue={userState?.lastName}></input>
                    </div>
                </div>
                <div className="contentRow">
                    <div className="contentColumn1">Сменить фото профиля:</div>
                    <div className="contentColumn2">
                        <input type="file" name="userPhoto" className="active-input" accept="image/*"></input>
                    </div>
                </div>

                <div className="contentRow">
                    <div className="contentColumn1">Новый пароль:</div>
                    <div className="contentColumn2">
                        <input type="password" name="userNewPassword" className="active-input"></input>
                    </div>
                </div><div className="contentRow">
                    <div className="contentColumn1">Повторите пароль:</div>
                    <div className="contentColumn2">
                        <input type="password" name="userRepeatPassword" className="active-input" defaultValue={userState?.lastName}></input>
                    </div>
                </div><div className="contentRow">
                    <div className="contentColumn1">Введите текущий пароль:</div>
                    <div className="contentColumn2">
                        <input type="password" name="userOldPassword" className="active-input" defaultValue={userState?.lastName}></input>
                    </div>
                </div>
                <div className="contentRow">
                    <div className="contentColumn">
                        <button type="submit" className="neon-button">Сохранить изменения</button>
                    </div>
                </div>
            </form>
        </div>
    </>
}
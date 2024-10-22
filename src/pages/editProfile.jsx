import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { withAuth } from "../hocs/withAuth.jsx";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
import { useGetFetchOnLoad, usePostFetchOnTrigger } from "../hooks/useFetchData.js";
import { ResponseMessagePlaceholder, LoadDataPlaceholder } from "../components/fetchPlaceholders.jsx";

export default withAuth(EditProfile);
export function EditProfile(props) {
    //page title
    const pageTitle = "Редактирование профиля";
    React.useLayoutEffect(() => {
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }, []);
    //show render count
    // const renderCount = React.useRef(1);
    // React.useEffect(() => {console.log(`Edit profile page render count: ${renderCount.current++}`);});
    //context
    const authContext = useAuthContext();
    //states
    const [isPasswordValid, setPasswordValid] = React.useState(true);
    const [isRepeatPasswordValid, setRepeatPasswordValid] = React.useState(true);
    const [isCurrentPasswordValid, setCurrentPasswordValid] = React.useState(true);
    //fields
    const navigate = useNavigate();
    const getProfile = useGetFetchOnLoad(`/api/users/${authContext.id}`, true);
    const postProfile = usePostFetchOnTrigger();
    //handlers
    function validatePassword(event){
        const password = event.target.form.userNewPassword;
        const repeatPassword = event.target.form.userRepeatPassword;
        const oldPassword = event.target.form.userOldPassword;
        if (password.value.length > 0) {
            if (oldPassword.value.length > 0) {
                oldPassword.setCustomValidity("");
            }
            else {
                oldPassword.setCustomValidity("Введите текущий пароль");
            }
            if (password.value.length < 6) {
                password.setCustomValidity("Слишком короткий");
            }
            else {
                password.setCustomValidity("");
            }
            if (password.value !== repeatPassword.value) {
                repeatPassword.setCustomValidity("Пароли не совпадают");
            }
            else {
                repeatPassword.setCustomValidity("");
            }
        } else {
            password.setCustomValidity("");
            repeatPassword.setCustomValidity("");
            oldPassword.setCustomValidity("");
        }
        password.validity.valid ? setPasswordValid(true) : setPasswordValid(false);
        repeatPassword.validity.valid ? setRepeatPasswordValid(true) : setRepeatPasswordValid(false);
        oldPassword.validity.valid ? setCurrentPasswordValid(true) : setCurrentPasswordValid(false);
    }
    async function submitForm(event) {
        event.preventDefault();
        let form = event.target;
        let formData = new FormData();
        formData.append("id", authContext.id);
        formData.append("email", authContext.email);
        formData.append("firstName", form.firstName.value);
        formData.append("lastName", form.lastName.value);
        if (form.userPhoto.files.length > 0) {
            formData.append("image", form.userPhoto.files[0]);
        }
        if (form.userNewPassword.value.length > 0) {
            formData.append("isPasswordChanging", true);
            formData.append("newPassword", form.userNewPassword.value);
            formData.append("oldPassword", form.userOldPassword.value);
        }
        else {
            formData.append("isPasswordChanging", false);
        }
        postProfile.handler(`/api/users/${authContext.id}/edit`, {
            isResponseJson: true,
            formData: formData,
            setDataHandler: getProfile.setData
        });
    }
    //render
    //profile image
    let imageDom;
    if (getProfile?.data?.imageUrl != "" && getProfile?.data?.imageUrl != null) {
        imageDom = <>
            <Row>
                <Column>
                    <img id="profilePhoto" src={`/api/${getProfile?.data?.imageUrl}`}></img>
                </Column>
            </Row>
        </>;
    //verified email check
    }
    let verifiedEmailDom;
    if (getProfile?.data?.verifiedAt == null) {
        verifiedEmailDom = <>
            <Row>
                <Column>
                    <span className="red-text">Ваш E-mail не подтвержден!</span>
                </Column>
            </Row>
            <Row>
                <Column>
                    <button className="neon-button" onClick={() => { navigate("/verify-email") } }>Подтвердить</button>
                </Column>
            </Row>
        </>;
    }
    else {
        verifiedEmailDom = <>
            <Row>
                <Column>
                    <span className="green-text">Ваш E-mail подтвержден!</span>
                </Column>
            </Row>
        </>;
    }
    //DOM
    const passwordClass = isPasswordValid ? "active-input" : "invalid-active-input";
    const repeatPasswordClass = isRepeatPasswordValid ? "active-input" : "invalid-active-input";
    const currentPasswordClass = isCurrentPasswordValid ? "active-input" : "invalid-active-input";
    return <>
        <BackButton/>
        <LoadDataPlaceholder isLoading={getProfile.isLoading} error={getProfile.error}>
            <Container>
                <ResponseMessagePlaceholder statusCode={getProfile.statusCode} data={getProfile.data} successMessage="Данные профиля загружены"/>
                {imageDom}
                <Row>
                    <Column1>ID:</Column1>
                    <Column2>
                        <input type="text" className="disabled-input" defaultValue={getProfile?.data?.id} disabled></input>
                    </Column2>
                </Row>
                <Row>
                    <Column1>Роль:</Column1>
                    <Column2>
                        <input type="text" className="disabled-input" defaultValue={getProfile?.data?.role?.description} disabled></input>
                    </Column2>
                </Row>
                <Row>
                    <Column1>E-mail:</Column1>
                    <Column2>
                        <input type="text" className="disabled-input" defaultValue={getProfile?.data?.email} disabled></input>
                    </Column2>
                </Row>
                {verifiedEmailDom}
                <Row>
                    <Column>
                        <button className="neon-button" onClick={() => { navigate("/change-email")}}>Изменить e-mail</button>
                    </Column>
                </Row>
                <br />
                <form encType="multipart/form-data" method="POST" onSubmit={submitForm }>
                    <Row>
                        <Column1>Имя:</Column1>
                        <Column2>
                            <input type="text" name="firstName" className="active-input" defaultValue={getProfile?.data?.firstName}></input>
                        </Column2>
                    </Row>
                    <Row>
                        <Column1>Фамилия:</Column1>
                        <Column2>
                            <input type="text" name="lastName" className="active-input" defaultValue={getProfile?.data?.lastName}></input>
                        </Column2>
                    </Row>
                    <Row>
                        <Column1>Сменить фото профиля:</Column1>
                        <Column2>
                            <input type="file" name="userPhoto" className="active-input" accept="image/*"></input>
                        </Column2>
                    </Row>
                    <Row>
                        <Column1>Новый пароль:</Column1>
                        <Column2>
                            <input type="password" name="userNewPassword" className={passwordClass} onChange={validatePassword}></input>
                        </Column2>
                    </Row>
                    <Row>
                        <Column1>Повторите пароль:</Column1>
                        <Column2>
                            <input type="password" name="userRepeatPassword" className={repeatPasswordClass} onChange={validatePassword}></input>
                        </Column2>
                    </Row>
                    <Row>
                        <Column1>Введите текущий пароль:</Column1>
                        <Column2>
                            <input type="password" name="userOldPassword" className={currentPasswordClass} onChange={validatePassword}></input>
                        </Column2>
                    </Row>
                    <Row>
                        <Column>
                            <button type="submit" className="neon-button">Сохранить изменения</button>
                        </Column>
                    </Row>
                </form>
                <LoadDataPlaceholder isLoading={postProfile.isLoading} error={postProfile.error}>
                    <ResponseMessagePlaceholder statusCode={postProfile.statusCode} data={postProfile.data} successMessage="Профиль успешно обновлен"/>
                </LoadDataPlaceholder>
            </Container>
        </LoadDataPlaceholder>
    </>
}
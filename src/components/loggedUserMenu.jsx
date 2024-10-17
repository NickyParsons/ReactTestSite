import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";
export default function LoggedUserMenu(props) {
    //fields
    //states
    //context
    const authContext = useAuthContext();
    //effects
    //handlers
    //render
    return <>
        <Link to={"/profiles/edit"}>
            <button className="menu-button">Редактировать профиль</button>
        </Link><br />
        <button className="menu-button" onClick={authContext.signOut}>Выход</button><br />
    </>;
}
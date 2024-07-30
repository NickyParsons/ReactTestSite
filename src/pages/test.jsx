import React, { useState, useRef, useEffect, useContext, useLayoutEffect } from "react";
import { AuthContext } from "../hocs/AuthProvider.jsx";
  
async function getData() {
    //let hostString = "http://192.168.1.2:5214";
    let hostString = "http://localhost:5214";
    try {
        let response = await fetch(`${hostString}/test3`, {
            method: "GET",
            headers: {
                "Accept": "*/*",
                "Content-Type": "*/*"
            },
            mode: "cors",
            credentials: "include"
        });
        if (response.status === 200) {
            console.log(`date: ${await response.text()}`);
        }
        else {
            console.log(response.statusText);
        }
    }
    catch (error) {
        console.log(`Something goes wrong: ${error}`);
    }
}
export default function Test(props) {
    //fields
    const pageTitle = "Тестовая страница";
    //context
    let authContext = useContext(AuthContext);
    //effects
    useLayoutEffect(setTitle, []);
    //handlers
    function setTitle() {
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }
    //render
    return <>
        <p>Props: {props.content}</p>
        <p>Login status: {authContext.isLoggedIn.toString()}</p>
        <p>ID: {authContext.id}</p>
        <p>User: {authContext.email}</p>
        <p>Role: {authContext.role}</p>
        <button onClick={getData}>TEST FETCH SEE CONSOLE</button><br/>
        <button className="menu-button">Menu button 1</button><hr></hr>
        <button className="menu-button">Menu button 2</button>
    </>
}
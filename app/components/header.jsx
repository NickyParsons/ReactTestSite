import { Link, NavLink } from "react-router-dom";
import { RegisterForm } from "./registerForm.jsx";
import { LoginForm } from "./loginForm.jsx";
const React = require("react");
  
class Header extends React.Component{
 
    constructor(props){
        super(props);
        this.toggleRigisterFormVisibility = this.toggleRigisterFormVisibility.bind(this);
        this.toggleLoginFormVisibility = this.toggleLoginFormVisibility.bind(this);
    }
    toggleRigisterFormVisibility(event) {
        event.preventDefault();
        const loginWindow = document.getElementById("loginWindow");
        const registerWindow = document.getElementById("registerWindow");
        if (loginWindow.classList.contains("windowVisible")) {
            loginWindow.classList.toggle("windowHidden");
            loginWindow.classList.toggle("windowVisible");
        }
        registerWindow.classList.toggle("windowHidden");
        registerWindow.classList.toggle("windowVisible");
    }
    toggleLoginFormVisibility(event) {
        event.preventDefault();
        const loginWindow = document.getElementById("loginWindow");
        const registerWindow = document.getElementById("registerWindow");
        if (registerWindow.classList.contains("windowVisible")) {
            registerWindow.classList.toggle("windowHidden");
            registerWindow.classList.toggle("windowVisible");
        }
        loginWindow.classList.toggle("windowHidden");
        loginWindow.classList.toggle("windowVisible");
    }
    render() {
        return <header>
            <h2>HEADER</h2>
            <div id="header">
                <div className="menu" id="logon">
                    <a href="/register" id="openRegisterBtn" className="navLink" onClick={this.toggleRigisterFormVisibility}>Регистрация</a>
                    <a href="/login" id="openLoginBtn" className="navLink" onClick={this.toggleLoginFormVisibility}>Вход</a>
                    <div id="loginWindow" className="popUpWindow windowHidden">
                        <LoginForm/>
                        <button id="closeLoginBtn" onClick={this.toggleLoginFormVisibility}>Закрыть</button>
                    </div>
                    <div id="registerWindow" className="popUpWindow windowHidden">
                        <RegisterForm/>
                        <button id="closeRegisterBtn" onClick={this.toggleRigisterFormVisibility}>Закрыть</button>
                    </div>
                </div>
                <div className="menu" id="navMenu">
                    <NavLink to="/" className="navLink">Test</NavLink>
                    <NavLink to="/counter" className="navLink">Counter</NavLink>
                </div>
                <h3 id="pageTitle">Page Title</h3>
            </div>
        </header>
    }
}
  
export { Header };
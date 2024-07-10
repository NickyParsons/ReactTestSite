import { Link, NavLink } from "react-router-dom";
const React = require("react");
  
class Header extends React.Component{
 
    constructor(props){
        super(props);
        this.toggleRigisterFormVisibility = this.toggleRigisterFormVisibility.bind(this);
    }
    toggleRigisterFormVisibility(event) {
        const registerBar = document.getElementById("registerBar");
        event.preventDefault();
        registerBar.classList.toggle("window-hidden");
        registerBar.classList.toggle("window-visible");
    }
    render() {
        return <header>
            <h2>HEADER</h2>
            <div id="header">
                <div className="menu" id="logon">
                    <a href="/register" id="openRegisterBtn" className="navLink" onClick={this.toggleRigisterFormVisibility}>Register</a>
                    <div id="registerBar" className="pop-up-window window-hidden">
                        register form here<button id="closeRegisterBtn" onClick={this.toggleRigisterFormVisibility}>Закрыть</button>
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
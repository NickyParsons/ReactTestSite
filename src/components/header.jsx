import { Link, NavLink } from "react-router-dom";
import { LoginControl } from "./loginControl.jsx";
import "../styles/header.css";
const React = require("react");
  
class Header extends React.Component{
 
    constructor(props){
        super(props);
    }
    render() {
        return <>
            <LoginControl/>
            <div className="menu" id="navMenu">
                <NavLink to="/" className="navLink">Статьи</NavLink>
                <NavLink to="/test" className="navLink">Test</NavLink>
                <NavLink to="/counter" className="navLink">Counter</NavLink>
            </div>
            <h3 id="pageTitle">Page Title</h3>
        </>
    }
}
  
export { Header };
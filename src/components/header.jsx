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
            <LoginControl></LoginControl>
            <div className="menu" id="navMenu">
                <NavLink to="/" className="navLink">Test</NavLink>
                <NavLink to="/counter" className="navLink">Counter</NavLink>
                <NavLink to="/articles" className="navLink">Статьи</NavLink>
            </div>
            <h3 id="pageTitle">Page Title</h3>
        </>
    }
}
  
export { Header };
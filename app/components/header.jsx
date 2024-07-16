import { Link, NavLink } from "react-router-dom";
import { LoginControl } from "./loginControl.jsx";
const React = require("react");
  
class Header extends React.Component{
 
    constructor(props){
        super(props);
    }
    render() {
        return <header>
            <h2>HEADER</h2>
            <div id="header">
                <LoginControl></LoginControl>
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
import { Outlet } from "react-router-dom";
import { Footer } from "./footer.jsx";
import { Header } from "./header.jsx";
const React = require("react");
  
class Layout extends React.Component{
 
    constructor(props){
        super(props);
    }
    render() {
        return <>

            <header id="header">
                <Header />
            </header>
            
            <main>
                <div id="leftSideBar">
                Left side bar
                </div>
                <div id="pageContent">
                    <Outlet />
                </div>
                <div id="rightSideBar">
                    Right side bar
                </div>
            </main>

            <footer id="footer">
                <Footer />
            </footer>
        </>
    }
}
  
export { Layout };
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
            <Header/>
            <main>
                <h2>MAIN</h2>
                <div id="pageContent">
                    <Outlet/>
                </div>
            </main>
            <Footer/>
        </>
    }
}
  
export { Layout };
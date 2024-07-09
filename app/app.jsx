const ReactDOM = require("react-dom/client");
const React = require("react");
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

const Test = require("./components/test.jsx");
const Counter = require("./components/counter.jsx");
import Nav from "./components/navMenu.jsx";
  
const text="Asshole";
  
ReactDOM.createRoot(
    document.getElementById("pageContent")
)
.render(
    <>
        
        <BrowserRouter>
            <Nav/>
            <div>
                <Routes>
                    <Route path="/test" element={<Test content={text} />} />
                    <Route path="/counter" element={<Counter count={7} />} />
                </Routes>
            </div>
        </BrowserRouter>
    </>
    
);
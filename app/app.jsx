const ReactDOM = require("react-dom/client");
const React = require("react");
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout }  from "./components/_layout.jsx";
import { NotFound } from "./components/notFound.jsx";
import { Test } from "./pages/test.jsx";
import { Counter } from "./pages/counter.jsx";
  
const text="This is some text on a main page of my site";
  
ReactDOM.createRoot(
    document.getElementById("app")
)
.render(
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Test content={text} />} />
                    <Route path="/counter" element={<Counter count={7} />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </>
);
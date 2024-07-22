const ReactDOM = require("react-dom/client");
const React = require("react");
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout }  from "./components/_layout.jsx";
import { NotFound } from "./components/notFound.jsx";
import Test from "./pages/test.jsx";
import { Counter } from "./pages/counter.jsx";
import { Articles } from "./pages/articles.jsx";
import { CreateArticle } from "./pages/createArticle.jsx";
import { AuthProvider } from "./hocs/AuthProvider.jsx";

import "./styles/_style.css";
  
ReactDOM.createRoot(
    document.getElementById("app")
)
.render(
    <>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Test content="Some text" />} />
                        <Route path="/counter" element={<Counter count={7} />} />
                        <Route path="/articles" element={<Articles />} />
                        <Route path="/articles/:guid" element={<Articles />} />  {/*UseParams() hook*/}
                        <Route path="/createArticle" element={<CreateArticle />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </>
);
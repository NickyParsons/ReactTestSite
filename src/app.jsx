const ReactDOM = require("react-dom/client");
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout }  from "./components/_layout.jsx";
import NotFound from "./pages/notFound.jsx";
import Test from "./pages/test.jsx";
import { Counter } from "./pages/counter.jsx";
import { Articles } from "./pages/articles.jsx";
import Article from "./pages/article.jsx";
import { CreateArticle } from "./pages/createArticle.jsx";
import { AuthProvider } from "./hocs/AuthProvider.jsx";
import EditProfile from "./pages/editProfile.jsx"
import AuthRequired from "./hocs/AuthRequired.jsx";
import VerifyEmail from "./pages/verify-email.jsx";
import ChangeEmail from "./pages/change-email.jsx";

import "./styles/_style.css";
import "./styles/contentContainer.css";
  
ReactDOM.createRoot(
    document.getElementById("app")
)
.render(
    <>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Articles />} />
                        <Route path="/counter" element={<Counter count={7} />} />
                        <Route path="/test" element={<Test content="Some text" />} />
                        <Route path="/articles/:articleId" element={<Article />}/>
                        <Route path="/articles/new" element={
                            <AuthRequired>
                                <CreateArticle />
                            </AuthRequired>
                        } />
                        <Route path="/profiles/edit" element={
                            <AuthRequired>
                                <EditProfile />
                            </AuthRequired>
                        } />
                        <Route path="/verify-email" element={<VerifyEmail />} />
                        <Route path="/change-email" element={<ChangeEmail />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </>
);
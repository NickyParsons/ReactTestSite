const ReactDOM = require("react-dom/client");
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout }  from "./components/_layout.jsx";
import NotFound from "./pages/notFound.jsx";
import { Test } from "./pages/test.jsx";
import { Counter } from "./pages/counter.jsx";
import { Articles } from "./pages/articles.jsx";
import Article from "./pages/article.jsx";
import CreateArticle from "./pages/createArticle.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import EditProfile from "./pages/editProfile.jsx"
import VerifyEmail from "./pages/verify-email.jsx";
import ChangeEmail from "./pages/change-email.jsx";
import ForgotPassword from "./pages/forgot-password.jsx";
import ResetPassword from "./pages/reset-password.jsx";

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
                        <Route path="/articles/new" element={<CreateArticle />} />
                        <Route path="/profiles/edit" element={<EditProfile />} />
                        <Route path="/verify-email" element={<VerifyEmail />} />
                        <Route path="/change-email" element={<ChangeEmail />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </>
);
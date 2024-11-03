import React from "react";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";

export default function NotAuthorized(props) {
    let text = props.message === undefined ? "Отказано в доступе" : props.message;
    return <>
        <BackButton />
        <Container>
            <span>text</span>
        </Container>
    </>;
}
import React from "react";
import { Container, Row, Column, Column1, Column2, BackButton } from "../hocs/ContentContainer.jsx";
import { GreenMessage, RedMessage, WhiteMessage } from "../components/containedColorMessage.jsx";

export default function NotAuthorized() {
    return <>
        <BackButton />
        <Container>
            <RedMessage text={"Требуется войти для просмотра данной страницы"}></RedMessage>
        </Container>
    </>;
}
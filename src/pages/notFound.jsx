const React = require("react");
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/contentContainer.jsx";
  
export default function NotFound(props) {
    return <>
        <BackButton/>
        <Container>
            <span>"Component not found!"</span>
        </Container>
    </>;
}
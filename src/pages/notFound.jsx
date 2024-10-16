const React = require("react");
import { Container, Row, Column, Column1, Column2, BackButton } from "../hocs/ContentContainer.jsx";
import { GreenMessage, RedMessage, WhiteMessage } from "../components/containedColorMessage.jsx";
  
export default function NotFound(props) {
    return <>
        <BackButton/>
        <Container>
            <RedMessage text={"Component not found!"}></RedMessage>
        </Container>
    </>;
}
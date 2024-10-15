const React = require("react");
import { useNavigate, useParams } from "react-router-dom";
  
export default function NotFound(props) {
    const navigate = useNavigate();
    return <>
        <button className="neon-button" onClick={() => { navigate(-1) }}>Назад</button><br />
        <h3>Component not found!</h3>
    </>;
}
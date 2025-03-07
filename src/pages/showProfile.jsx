import React from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { withAuth } from "../hocs/withAuth.jsx";
import { Container, Row, Column, Column1, Column2, BackButton } from "../components/ContentContainer/contentContainer.jsx";
import { useFetch } from "../hooks/useFetchData.js";
import { ResponseMessagePlaceholder, LoadDataPlaceholder } from "../components/fetchPlaceholders.jsx";

export function ShowProfile(props) {
    //page title
    const pageTitle = "Страница профиля";
    React.useLayoutEffect(() => {
        document.title = `NickyParsons Site | ${pageTitle}`;
        document.getElementById("pageTitle").innerText = pageTitle;
    }, []);
    //show render count
    // const renderCount = React.useRef(1);
    // React.useEffect(() => {console.log(`Edit profile page render count: ${renderCount.current++}`);});

    const authContext = useAuthContext();
    const { profileId } = useParams();
    const getFetch = useFetch({
        url: `/api/users/${profileId}`,
        method: "GET",
        isResponseJson: true,
        formData: undefined,
        queryData: undefined,
        onSuccess: undefined,
        setDataHandler: undefined,
        executeOnLoad: true
    });
    
    //render
    //profile image DOM
    let imageDom;
    if (getFetch?.data?.imageUrl != "" && getFetch?.data?.imageUrl != null) {
        imageDom = <>
            <Row>
                <Column>
                    <img id="profilePhoto" src={`/api/${getFetch?.data?.imageUrl}`}></img>
                </Column>
            </Row>
        </>;
    }
    //DOM
    return <>
        <BackButton/>
        <Container>
            <Row>
                <Column1>
                    <span>ID:</span>
                </Column1>
                <Column2>
                    <span>{profileId}</span>
                </Column2>
            </Row>
            {imageDom}
        </Container>
    </>
}
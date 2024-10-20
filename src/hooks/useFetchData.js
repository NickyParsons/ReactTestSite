import React from "react";
export function useFetch(url, method){
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [data, setData] = React.useState({});
    const [statusCode, setStatusCode] = React.useState(undefined);
    React.useEffect(()=>{
        async function execute() {
            try {
                setIsLoading(true);
                let response = await fetch(url, {
                    method: method,
                    headers: {
                        "Accept": "*/*",
                        "Content-Type": "*/*"
                    },
                    mode: "cors",
                    credentials: "include"
                });
                setStatusCode(response.status);
                if(response.status === 200){
                    setData(await response.json());
                } else {
                    setData(await response.text());
                }
            } catch (error) {
                setError(error);
            } finally{
                setIsLoading(false);
            }
        }
        execute();
    }, []);
    return {isLoading, statusCode, data, error};
}

export function useFetchOnTrigger(){
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(undefined);
    const [data, setData] = React.useState({});
    const [statusCode, setStatusCode] = React.useState(undefined);
    async function execute(url, method, json, onSuccess) {
        try {
            setIsLoading(true);
            let response = await fetch(url, {
                method: method,
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "*/*"
                },
                mode: "cors",
                credentials: "include"
            });
            setStatusCode(response.status);
            if(response.status === 200){
                json === true ? setData(await response.json()) : setData(await response.text());
                if ((onSuccess != undefined) && onSuccess != null) {
                    onSuccess();
                }
            } else {
                setData(await response.text());
            }
        } catch (error) {
            setError(error);
        } finally{
            setIsLoading(false);
        }
    }
    const handler = (url, method, json, onSuccess)=> {
        execute(url, method, json, onSuccess);
    };
    return {handler, isLoading, statusCode, data, error};
}
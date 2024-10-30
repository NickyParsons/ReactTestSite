export function useFetch(fetchOptions = {
    url: "/",
    method: "GET",
    isResponseJson: true,
    formData: undefined,
    onSuccess: undefined,
    setDataHandler: undefined,
    executeOnLoad: false
}){
    if (fetchOptions.formData === undefined) {
        fetchOptions.formData = null;
    }
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(undefined);
    const [data, setData] = React.useState([]);
    const [statusCode, setStatusCode] = React.useState(undefined);
    async function execute(formData) {
        try {
            setIsLoading(true);
            if (formData === undefined) {
                formData = fetchOptions.formData;
            }
            let response = await fetch(fetchOptions.url, {
                method: fetchOptions.method,
                headers: {
                    "Accept": "*/*"
                },
                body: formData,
                mode: "cors",
                credentials: "include"
            });
            setStatusCode(response.status);
            if(response.status === 200){
                let responseData;
                // // Принимаем JSON или текст
                fetchOptions.isResponseJson ? responseData = await response.json() : responseData = await response.text();
                // // Используем обработчик установки state извне или внутри хука
                fetchOptions.setDataHandler === undefined ? setData(responseData) : fetchOptions.setDataHandler(responseData);
                // // если надо выполняем функцию извне
                if (fetchOptions.onSuccess !== undefined) fetchOptions.onSuccess(responseData);
            } 
            else 
            {
                setError(await response.text());
            }
        } catch (error) {
            setError(error);
        } finally{
            setIsLoading(false);
        }
    }
    if (fetchOptions.executeOnLoad) {
        React.useEffect(()=>{
            execute();
        }, []);
    }
    const fetchHandler = (formData)=> {
        execute(formData);
    };
    return {fetchHandler, setData, isLoading, statusCode, data, error};
}





//неактуальные
import React from "react";
export function useGetFetchOnLoad(url, isResponseJson = false){
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(undefined);
    const [data, setData] = React.useState();
    const [statusCode, setStatusCode] = React.useState(undefined);
    React.useEffect(()=>{
        async function execute() {
            try {
                setIsLoading(true);
                let response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Accept": "*/*"
                    },
                    mode: "cors",
                    credentials: "include"
                });
                setStatusCode(response.status);
                if(response.status === 200){
                    isResponseJson === true ? setData(await response.json()) : setData(await response.text());
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
    return {isLoading, statusCode, data, setData, error};
}
export function usePostFetchOnTrigger(){
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(undefined);
    const [data, setData] = React.useState();
    const [statusCode, setStatusCode] = React.useState(undefined);
    async function execute(url, fetchOptions = {
        isResponseJson: false,
        formData: undefined,
        onSuccess: undefined,
        setDataHandler: undefined
    }) {
        try {
            setIsLoading(true);
            if (fetchOptions.formData === undefined) {
                fetchOptions.formData = new FormData();
            }
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Accept": "*/*"
                },
                body: fetchOptions.formData,
                mode: "cors",
                credentials: "include"
            });
            setStatusCode(response.status);
            if(response.status === 200){
                let responseData;
                // Принимаем JSON или текст
                fetchOptions.isResponseJson ? responseData = await response.json() : responseData = await response.text();
                // Используем обработчик установки state извне или внутри хука
                fetchOptions.setDataHandler === undefined ? setData(responseData) : fetchOptions.setDataHandler(responseData);
                // если надо выполняем функцию извне
                if (fetchOptions.onSuccess !== undefined) fetchOptions.onSuccess();
            } else {
                setData(await response.text());
            }
        } catch (error) {
            setError(error);
        } finally{
            setIsLoading(false);
        }
    }
    const handler = (url, fetchOptions)=> {
        execute(url, fetchOptions);
    };
    return {handler, isLoading, statusCode, data, error};
}
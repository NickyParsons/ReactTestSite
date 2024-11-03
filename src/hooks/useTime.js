import React from "react";

function useElapsedTime(timeString){
    const [elapsedTime, setElapsedTime] = React.useState("");
    const elapsedTimeRef = React.useRef(0);
    let time = new Date(timeString);
    const intervalfunction = React.useCallback(()=>{
        let currentTime = new Date();
        let unixElapsetTime = currentTime - time;
        let secondsCount = (unixElapsetTime - (unixElapsetTime % 1000)) / 1000;
        // console.log(`${secondsCount} секунд назад`);
        let message;
        if(secondsCount < 60) 
        {
            message = `менее минуты назад`
        }
        else 
        {
            let minutesCount = (secondsCount - (secondsCount % 60)) / 60;
            if (minutesCount < 60) {
                message = `${minutesCount} минут назад`;
                //расчет окончания
                let modulo = minutesCount % 10;
                let ten = (minutesCount - modulo) / 10;
                if (ten != 1) {
                    if (modulo == 1) 
                    {
                        message = `${minutesCount} минуту назад`;
                    }
                    else if ((modulo == 2) || (modulo == 3) || (modulo == 4))
                    {
                        message = `${minutesCount} минуты назад`;
                    }
                }
            }
            else
            {
                let hoursCount = (minutesCount - (minutesCount % 60)) / 60;
                if (hoursCount < 24) {
                    message = `${hoursCount} часов назад`;
                    //расчет окончания
                    let modulo = hoursCount % 10;
                    let ten = (hoursCount - modulo) / 10;
                    if (ten != 1) {
                        if (modulo == 1) 
                        {
                            message = `${hoursCount} час назад`;
                        }
                        else if ((modulo == 2) || (modulo == 3) || (modulo == 4))
                        {
                            message = `${hoursCount} часа назад`;
                        }
                    }
                }
                else
                {
                    let daysCount = (hoursCount - (hoursCount % 24)) / 24;
                    message = `${daysCount} дней назад`
                    //расчет окончания
                    let modulo = daysCount % 10;
                    let ten = (daysCount - modulo) / 10;
                    if (ten != 1) {
                        if (modulo == 1) 
                        {
                            message = `${daysCount} день назад`;
                        }
                        else if ((modulo == 2) || (modulo == 3) || (modulo == 4))
                        {
                            message = `${daysCount} дня назад`;
                        }
                    }
                }
            }
        }
        setElapsedTime(message);
    }, []);
    React.useEffect(()=>{
        intervalfunction();
        let timer = setInterval(intervalfunction, 60000);
        return ()=>{
            clearInterval(timer);
        }
    }, []);
    return elapsedTime;
}


export {useElapsedTime}
import React, {useState} from 'react';
import Meets from "./Meets";
import {useMeets} from "../tools/service";
import {getMeetsGroup2, getWeek} from "../tools/helper";
import {LocalDate} from "@js-joda/core";
import {useLocation, useNavigate} from "react-router-dom";
import {useGeolocation} from "../tools/geolocation";

export default function MeetsView() {
    const { latitude, longitude, error: geolocationError } = useGeolocation()
    const { data: meets = [], refetch } = useMeets()
    const location = useLocation();
    const date = new URLSearchParams(location.search).get('date')
    const history = useNavigate();

    const localDate = LocalDate.now()
    const [selectedDate, setSelectedDate] = useState<string>(date ? date : localDate.toString())
    const week = getWeek(selectedDate, meets)

    // if (geolocationError) {
    //     return (
    //         <div>
    //             Ошибка определения геолокации:
    //             {geolocationError}
    //         </div>
    //     )
    // }
    return (
        <Meets refetch={refetch} week={week} onChangeDay={(date) => {
            setSelectedDate(date)
            history(`/?date=${date}`)
        }} />
    );
}

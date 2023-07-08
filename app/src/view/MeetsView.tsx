import React, {useState} from 'react';
import Meets from "./Meets";
import {useMeets} from "../tools/service";
import {getFilteredMeetsByDate, getMeetsGroup2, getWeek} from "../tools/helper";
import {LocalDate} from "@js-joda/core";
import {useLocation, useNavigate} from "react-router-dom";
import {useGeolocation} from "../tools/geolocation";

export default function MeetsView() {
    const { latitude, longitude, error: geolocationError } = useGeolocation()
    const { data: meets = [], refetch } = useMeets({ latitude, longitude })
    const location = useLocation();
    const date = new URLSearchParams(location.search).get('date')
    const history = useNavigate();

    const localDate = LocalDate.now()
    const [selectedDate, setSelectedDate] = useState<string>(date ? date : localDate.toString())
    const meetsGroup = getMeetsGroup2(meets)
    const week = getWeek(selectedDate, meetsGroup)
    const filteredMeets = getFilteredMeetsByDate(meets, selectedDate)

    if (geolocationError) {
        return (
            <div>
                Ошибка определения геолокации:
                {geolocationError}
            </div>
        )
    }

    return (
        <Meets meets={filteredMeets} refetch={refetch} week={week} onChangeDay={(date) => {
            setSelectedDate(date)
            history(`/?date=${date}`)
        }} />
    );
}

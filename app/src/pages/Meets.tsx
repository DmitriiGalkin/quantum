import React, {useState} from 'react';
import Meets from "../components/Meets";
import {useMeets} from "../modules/user";
import {getFilteredMeetsByDate, getMeetsGroup2, getWeek} from "../tools/helper";
import {LocalDate} from "@js-joda/core";

export default function MeetsPage() {
    const { data: meets = [], refetch } = useMeets()

    const localDate = LocalDate.now()
    const [selectedDate, setSelectedDate] = useState<string>(localDate.toString())
    const meetsGroup = getMeetsGroup2(meets)
    const week = getWeek(selectedDate, meetsGroup)
    const filteredMeets = getFilteredMeetsByDate(meets, selectedDate)

    return (
        <Meets meets={filteredMeets} refetch={refetch} week={week} onChangeDay={setSelectedDate} />
    );
}

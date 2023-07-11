import React from 'react';
import Meets from "./Meets";
import {useMeets} from "../tools/service";
import {getWeek} from "../tools/helper";
import {LocalDate} from "@js-joda/core";
import { useLocalStorage } from 'usehooks-ts'

export default function MeetsView() {
    const { data: meets = [], refetch } = useMeets()
    const [selectedDate, setSelectedDate] = useLocalStorage<string>('date', LocalDate.now().toString())
    const week = getWeek(selectedDate, meets)

    return (
        <Meets refetch={refetch} week={week} selectedDate={selectedDate} onChangeDay={setSelectedDate} />
    );
}

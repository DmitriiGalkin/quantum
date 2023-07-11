import React from 'react';
import Meets from "./Meets";
import {useMeets} from "../tools/service";
import {getWeek} from "../tools/helper";
import {LocalDate} from "@js-joda/core";
import {useLocalStorage} from 'usehooks-ts'

export default function MeetsView() {
    const { data: meets = [], refetch } = useMeets()
    const [date, setDate] = useLocalStorage<string>('date', LocalDate.now().toString())
    const week = getWeek(date, meets)
    const day = week.find(({ id }) => id === date);

    return (
        <Meets week={week} day={day} setDate={setDate} refetch={refetch} />
    );
}

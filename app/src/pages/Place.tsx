import * as React from 'react';
import {useState} from 'react';
import Typography from '@mui/material/Typography';
import {usePlace} from "../modules/place";
import {Stack} from "@mui/material";
import {useParams} from "react-router-dom";
import Back from "../components/Back";
import Meets from "../components/Meets";
import {LocalDate} from "@js-joda/core";
import {getFilteredMeetsByDate, getMeetsGroup2, getWeek} from "../tools/helper";

export default function PlaceDialog() {
    const { id: placeId } = useParams();
    const { data: place, refetch } = usePlace(Number(placeId))

    const localDate = LocalDate.now()
    const [selectedDate, setSelectedDate] = useState<string>(localDate.toString())
    const meetsGroup = getMeetsGroup2(place?.meets)
    const week = getWeek(selectedDate, meetsGroup)
    const filteredMeets = getFilteredMeetsByDate(place?.meets || [], selectedDate)


    if (!place) return null;

    return (
        <>
            <Back title={place.title}/>
            <Stack spacing={2}>
                <Typography>
                    {place.description}
                </Typography>
                <div style={{ paddingTop: 30 }}>
                    <Meets meets={filteredMeets} refetch={refetch} week={week} onChangeDay={setSelectedDate} />
                </div>
            </Stack>
        </>
    )
}

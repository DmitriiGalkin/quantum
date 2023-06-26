import * as React from 'react';
import Typography from '@mui/material/Typography';
import {usePlace} from "../modules/place";
import {Stack} from "@mui/material";
import ProjectCard from "../components/cards/ProjectCard";
import {useNavigate, useParams} from "react-router-dom";
import Back from "../components/Back";
import QContainer from "../components/QContainer";
import Meets from "../components/Meets";
import {LocalDate} from "@js-joda/core";
import {useState} from "react";
import {getFilteredMeetsByDate, getMeetsGroup2, getWeek} from "../tools/helper";

export default function PlaceDialog() {
    const { id: placeId } = useParams();
    const navigate = useNavigate();
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
            <QContainer>
                <Stack spacing={2}>
                    <Typography>
                        {place.description}
                    </Typography>
                    <div style={{ paddingTop: 30 }}>
                        <Meets meets={filteredMeets} refetch={refetch} week={week} onChangeDay={setSelectedDate} />
                    </div>
                    {/*<Stack spacing={2}>*/}
                    {/*    {place.projects.map((project) => (*/}
                    {/*        <ProjectCard*/}
                    {/*            key={project.id}*/}
                    {/*            project={project}*/}
                    {/*            onClick={() => navigate(`/project/${project.id}`)}*/}
                    {/*        />*/}
                    {/*    ))}*/}
                    {/*</Stack>*/}
                </Stack>
            </QContainer>
        </>
    );
}

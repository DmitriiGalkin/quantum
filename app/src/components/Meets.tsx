import React, {useState} from 'react';
import {Box, Link, Stack} from "@mui/material";
import {useMeets} from "../modules/user";
import {useMain} from "../layouts/MainLayout";
import Calendar from "../components/Calendar";
import MeetCard from "../components/cards/MeetCard";
import {CalendarDay, getFilteredMeetsByDate, getMeetsGroup2, getWeek} from "../tools/helper";
import {LocalDate} from "@js-joda/core";
import {Meet} from "../modules/meet";
import NewMeetCard from "./fields/NewMeetCard";

interface MeetsProps {
    meets: Meet[]
    week: CalendarDay[]
    refetch?: () => void
    onChangeDay?: (date: string) => void
    selectedMeet?: Meet
}
export default function Meets({meets, refetch, onChangeDay, week, selectedMeet}: MeetsProps) {
    return (
        <Stack spacing={4} direction="column">
            <Calendar week={week} onChange={onChangeDay} />
            {Boolean(meets.length) && (
                <Stack spacing={2}>
                    {meets.map((meet, index) =>
                        <div key={meet.id}>
                            <div key={meet.id}>
                                <MeetCard meet={meet} selected={selectedMeet?.id === meet.id} refetch={refetch} />
                            </div>
                        </div>
                    )}
                </Stack>
            )}
            {/*<div style={{ width: 67, height: 67 }}>*/}
            {/*    <NewMeetCard refetch={refetch} />*/}
            {/*</div>*/}
        </Stack>
    );
}

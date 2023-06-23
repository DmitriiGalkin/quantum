import React, {useState} from 'react';
import {Box, Link, Stack} from "@mui/material";
import {useMeets} from "../modules/user";
import {useMain} from "../layouts/MainLayout";
import Calendar from "../components/Calendar";
import MeetCard from "../components/cards/MeetCard";
import {CalendarDay, getFilteredMeetsByDate, getMeetsGroup2, getWeek} from "../tools/helper";
import {LocalDate} from "@js-joda/core";
import {Meet} from "../modules/meet";

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
            {Boolean(meets.length) ? (
                <Stack spacing={3}>
                    {meets.map((meet, index) =>
                        <div key={meet.id}>
                            <div key={meet.id}>
                                <MeetCard meet={meet} selected={selectedMeet?.id === meet.id} refetch={refetch} />
                            </div>
                        </div>
                    )}
                </Stack>
            ) : (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="80vh"
                >
                    <span>Встреч нет</span>
                </Box>
            )}
        </Stack>
    );
}

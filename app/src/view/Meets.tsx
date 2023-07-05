import React from 'react';
import {Stack} from "@mui/material";
import {Calendar, MeetCard} from "../components";
import {CalendarDay} from "../tools/helper";
import {Meet} from "../tools/dto";

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
        </Stack>
    );
}

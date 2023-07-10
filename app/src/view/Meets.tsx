import React from 'react';
import {Stack} from "@mui/material";
import {Calendar, MeetCard} from "../components";
import {CalendarDay, getFilteredMeetsByDate} from "../tools/helper";
import {Meet} from "../tools/dto";
import SwipeableViews from 'react-swipeable-views';

interface MeetsProps {
    meetsGroup: { id:string, meets: Meet[] }[]
    week: CalendarDay[]
    refetch?: () => void
    onChangeDay?: (date: string) => void
    selectedMeet?: Meet
}
export default function Meets({meetsGroup, refetch, onChangeDay, week, selectedMeet}: MeetsProps) {
    return (
        <Stack spacing={4} direction="column" style={{ position: 'relative' }}>
            <Calendar week={week} onChange={onChangeDay} />
            {meetsGroup.length && (
                <SwipeableViews>
                    {meetsGroup.map(({id, meets}) => {
                        <div key={id} style={{ height: '300px' }}>
                            <Stack spacing={2} style={{ height: '300px' }}>
                                {meets.map((meet) =>
                                    <div key={meet.id}>
                                        <div key={meet.id}>
                                            <MeetCard meet={meet} selected={selectedMeet?.id === meet.id} refetch={refetch} />
                                        </div>
                                    </div>
                                )}
                            </Stack>
                        </div>
                    }) as React.ReactNode[]}
                </SwipeableViews>
            )}
        </Stack>
    );
}

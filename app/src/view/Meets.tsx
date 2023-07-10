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
    onChangeDay: (date: string) => void
    selectedMeet?: Meet
}
export default function Meets({meetsGroup, refetch, onChangeDay, week, selectedMeet}: MeetsProps) {
    console.log(meetsGroup, 'meetsGroup')
    const [value, setValue] = React.useState(0);

    const handleChangeIndex = (index: number) => {
        const date = meetsGroup[index].id
        onChangeDay(date)
        setValue(index);
    };
    return (
        <Stack spacing={4} direction="column" style={{ position: 'relative' }}>
            <Calendar week={week} onChange={onChangeDay} />
                <SwipeableViews
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    {meetsGroup.map(({id, meets}) => (
                        <div key={id} style={{ minHeight: 100 }}>
                            <Stack spacing={2}>
                                {meets.map((meet) =>
                                    <div key={meet.id}>
                                        <div key={meet.id}>
                                            <MeetCard meet={meet} selected={selectedMeet?.id === meet.id} refetch={refetch} />
                                        </div>
                                    </div>
                                )}
                            </Stack>
                        </div>
                    ))}
                </SwipeableViews>
        </Stack>
    );
}

import React from 'react';
import {Meet} from "../modules/meet";
import {getMonthLongTitle} from "../tools/date";
import {Divider, Stack, Theme, Typography} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {LocalDate} from "@js-joda/core";
import MeetCard from "./cards/MeetCard";

// const useStyles = makeStyles((theme: Theme) => ({
//     month: {
//         fontSize: 13,
//         fontWeight: 700,
//     },
// }));

interface DayProps {
    date: string
    meets: Meet[]
    refetch: () => void
}
export default function Day({ date, meets, refetch }: DayProps): JSX.Element {
    // const classes = useStyles();
    if (!date) { return <></> }
    const localDate = LocalDate.parse(date)
    const day = localDate.dayOfMonth()
    const monthShortTitle = getMonthLongTitle(localDate.monthValue())

    return (
        <Stack spacing={1} key={date}>
            <Stack spacing={1} direction="row" alignItems="flex-end">
                <Typography style={{ fontSize: '21.37px', lineHeight: '40.4px', textTransform: 'lowercase' }}>
                    {day} {monthShortTitle}
                </Typography>
            </Stack>
            <Stack spacing={3}>
                {meets.map((meet, index) =>
                    <div key={meet.id}>
                        <div key={meet.id}>
                            <MeetCard meet={meet} refetch={refetch} />
                        </div>
                    </div>
                )}
            </Stack>
        </Stack>
    )
}

import React from 'react';
import {Meet} from "../modules/meet";
import {getMonthLongTitle} from "../tools/date";
import {Divider, Stack, Theme, Typography} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {LocalDate} from "@js-joda/core";
import MeetCard from "./cards/MeetCard";
import {DEFAULT_COLOR} from "../tools/theme";

const useStyles = makeStyles((theme: Theme) => ({
    meetsGroup: {
        paddingBottom: theme.spacing(2),
    },
    date: {
        position: 'sticky',
        top: 0,
        padding: '6px 0',
        textAlign: 'center',
        borderBottom: `1px solid ${DEFAULT_COLOR}`
    },
    month: {
        fontSize: 13,
        fontWeight: 700,
    },
    meets: {
        flexGrow: 1,

        '& > div:first-child > div': {
            borderRadius: '0 12px 0 0',
        },
        '& > div:last-child > div': {
            borderRadius: '0 0 12px 0',
        },
    },
}));

interface DayProps {
    date: string
    meets: Meet[]
    refetch: () => void
}
export default function Day({ date, meets, refetch }: DayProps): JSX.Element {
    const classes = useStyles();
    if (!date) { return <></> }
    const localDate = LocalDate.parse(date)
    const day = localDate.dayOfMonth()
    const monthShortTitle = getMonthLongTitle(localDate.monthValue())

    return (
        <div className={classes.meetsGroup} key={date}>
            <div className={classes.date}>
                <Stack spacing={2} direction="row" alignItems="flex-end">
                    <Typography style={{ fontFamily: 'Bebas Neue', fontSize: 26, lineHeight: '28px' }}>
                        {day}
                    </Typography>
                    <Typography className={classes.month} variant="subtitle1">
                        {monthShortTitle}
                    </Typography>
                </Stack>
            </div>
            <div className={classes.meets}>
                {meets.map((meet, index) =>
                    <div key={meet.id}>
                        {Boolean(index) && <Divider light variant="middle" />}
                        <div key={meet.id}>
                            <MeetCard meet={meet} refetch={refetch} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

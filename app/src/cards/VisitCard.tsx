import React from 'react';
import {Meet, ParticipationUser, Visit, VisitUser} from "../tools/dto";
import {Avatar, Chip, Stack} from "@mui/material";
import Typography from "../components/Typography";
import {Button, Icon} from "../components";
import {useDeleteVisit, usePaidedVisit, useStartedVisit, useStoppedVisit} from "../tools/service";
import clsx from "clsx";
import {makeStyles} from "@mui/styles";
import {COLOR_DEFAULT} from "../tools/theme";
import {getIsStart} from "../tools/date";
import CreditScore from '@mui/icons-material/CreditScore'; // CurrencyRuble

const useStyles = makeStyles(() => ({
    card: {
        borderRadius: 8, backgroundColor: 'white', padding: 9, border: '1px solid ' + COLOR_DEFAULT
    },
    isStarted: {
        border: '2px solid orange',
        padding: 8
    },
    isMiss: {
        opacity: 0.5
    }
}));


interface VisitCardProps {
    visit: VisitUser
    refetch: () => void
    meet: Partial<Meet>
}

export function VisitCard({ visit, refetch, meet }: VisitCardProps) {
    const startedVisit = useStartedVisit()
    const stoppedVisit= useStoppedVisit()
    const paidedVisit = usePaidedVisit()
    const deleteVisit = useDeleteVisit()
    const onStarted = () => startedVisit.mutateAsync(visit).then(() => refetch())
    const onStopped =  () => stoppedVisit.mutateAsync(visit).then(() => refetch())
    const onPaided =  () => paidedVisit.mutateAsync(visit).then(() => refetch())
    const onDeleteVisit =  () => deleteVisit.mutateAsync(visit).then(() => refetch())
    const classes = useStyles();
    const isStarted = visit.started && !visit.stopped
    const isMiss = !visit.started && visit.stopped
    const isStart = getIsStart(meet.datetime) // true //

    return (
        <Stack className={clsx(classes.card, isStarted && classes.isStarted, isMiss && classes.isMiss)} spacing={3} direction="row" justifyContent="space-between" style={{  }}>
            <Avatar key={visit.userId} alt={visit.title} src={visit.image} />
            <Stack direction="column" spacing={1} style={{flexGrow:1}}>
                <Stack direction="row" justifyContent="space-between" spacing={1}>
                    <Typography variant="Body">{visit.title}, {visit.age} лет</Typography>
                    {/*<Icon name="delete" onClick={onDeleteVisit}/>*/}
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={1}>
                    {meet.price && (
                        <Chip
                            label={visit.paided ? 'оплачено' : 'не оплачено'}
                            color={visit.paided ? 'success' : (isStart ? 'warning' : undefined )}
                            size="small"
                            onDelete={!visit.paided ? onPaided : undefined}
                            deleteIcon={!visit.paided ? <CreditScore /> : undefined}
                        />
                    )}
                    <Stack direction="row" spacing={1}>
                        {!visit.started && <Button variant="small" onClick={onStarted}>Пришел</Button>}
                        {isStarted && <Button variant="small2" onClick={onStopped}>Ушел</Button>}
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}

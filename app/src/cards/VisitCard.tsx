import React from 'react';
import {Visit} from "../tools/dto";
import {Avatar, Chip, Stack} from "@mui/material";
import Typography from "../components/Typography";
import {Button, Card} from "../components";
import {useDeleteVisit, usePaidedVisit, useStartedVisit, useStoppedVisit} from "../tools/service";
import clsx from "clsx";
import {makeStyles} from "@mui/styles";
import {COLOR_DEFAULT} from "../tools/theme";
import {convertToObject, getIsStart} from "../tools/date";
import CreditScore from '@mui/icons-material/CreditScore';
import {Parameter} from "../components/Parameter";
import {useAuth} from "../tools/auth";

const useStyles = makeStyles(() => ({
    // card: {
    //     border: '1px solid ' + COLOR_DEFAULT
    // },
    isStarted: {
        border: '2px solid orange',
    },
    isMiss: {
        opacity: 0.5
    },
    isFinish: {
        opacity: 0.1
    }
}));


interface VisitCardProps {
    visit: Visit
    refetch: () => void
}

export function VisitCard({ visit, refetch }: VisitCardProps) {
    const { passport } = useAuth();

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
    const isStart = getIsStart(visit.meet?.datetime) // true //

    const { time, shortMonth, day } = convertToObject(visit.meet?.datetime)

    return (
        <Card>
            <Stack className={clsx(isStarted && classes.isStarted, isMiss && classes.isMiss)} direction="row">
                {visit.meet?.project && (
                    <div>
                        <div style={{borderRadius: '8px 0 0 8px', height: '100%', display: 'flex', width: 60, backgroundImage: `url(${visit.meet?.project.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
                    </div>
                )}
                <Stack spacing={3} direction="row" style={{ padding: 9, width: '100%' }}>
                    {visit.user && <Avatar alt={visit.user?.title} src={visit.user?.image} />}
                    <Stack spacing={1} style={{flexGrow:1}}>
                        {visit.meet?.project && (
                            <Typography variant="Header2">{visit.meet?.project?.title}</Typography>
                        )}
                        <Stack justifyContent="space-between" spacing={1}>
                            {visit?.meet?.project?.place && <Parameter name="place2" title={visit?.meet?.project?.place.title} />}
                            {visit?.meet && (
                                <Stack direction="row" alignContent="center" spacing={2}>
                                    {time && <Parameter name="time2" title={time} />}
                                    {visit.meet.duration && <Parameter name="timer" title={visit.meet.duration} />}
                                    {visit.meet.price && <Parameter name="ruble" title={visit.meet.price} />}
                                    {visit.meet?.deleted && <Chip label="отмена" size="small" color="warning" />}
                                </Stack>
                            )}
                            {visit.user && (<Typography variant="Body">{visit.user?.title}, {visit.user?.age} лет</Typography>)}
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" spacing={1}>
                            {visit.meet?.price ? (
                                <Chip
                                    label={visit.paided ? 'оплачено' : 'не оплачено'}
                                    color={visit.paided ? 'success' : (isStart ? 'warning' : undefined )}
                                    size="small"
                                    onDelete={!visit.paided ? onPaided : undefined}
                                    deleteIcon={!visit.paided ? <CreditScore /> : undefined}
                                />
                            ) : (
                                <Chip label="бесплатно" size="small"/>
                            )}
                            <Stack direction="row" spacing={1} style={{ width: '100%', justifyContent: 'end' }} >
                                {visit.meet?.passportId === passport.id && !visit.started && <Button variant="small" onClick={onStarted}>Пришел</Button>}
                                {visit.meet?.passportId === passport.id && isStarted && <Button variant="small2" onClick={onStopped}>Ушел</Button>}
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    );
}

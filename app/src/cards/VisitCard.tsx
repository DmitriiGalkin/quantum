import React from 'react';
import {ParticipationUser, Visit, VisitUser} from "../tools/dto";
import {Avatar, Stack} from "@mui/material";
import Typography from "../components/Typography";
import {Button, Icon} from "../components";
import {useDeleteVisit, usePaidedVisit, useStartedVisit, useStoppedVisit} from "../tools/service";

interface VisitCardProps {
    visit: VisitUser
    refetch: () => void
}

export function VisitCard({ visit, refetch }: VisitCardProps) {
    const startedVisit = useStartedVisit()
    const stoppedVisit= useStoppedVisit()
    const paidedVisit = usePaidedVisit()
    const deleteVisit = useDeleteVisit()
    const onStarted = () => startedVisit.mutateAsync(visit).then(() => refetch())
    const onStopped =  () => stoppedVisit.mutateAsync(visit).then(() => refetch())
    const onPaided =  () => paidedVisit.mutateAsync(visit).then(() => refetch())
    const onDeleteVisit =  () => deleteVisit.mutateAsync(visit).then(() => refetch())

    return (
        <Stack spacing={3} direction="row" justifyContent="space-between">
            <Avatar key={visit.userId} alt={visit.title} src={visit.image} />
            <Stack direction="row" justifyContent="space-between" style={{ flexGrow: 1 }} alignItems="flex-start">
                <Stack spacing={1} direction="column">
                    <Typography variant="Body">{visit.title}</Typography>
                    <div style={{ opacity: .6, lineHeight: '21px'}}>
                        {visit.paided ? (
                            <span>оплатил</span>
                        ) : (
                            <span>не оплатил</span>
                        )}
                    </div>
                </Stack>
                {!visit.started && <Button onClick={onStarted} variant="small">Пришел</Button>}
                {visit.started && !visit.stopped && <Button onClick={onStopped} variant="small">Ушел</Button>}
                <Icon onClick={onDeleteVisit} name="delete"/>
            </Stack>
        </Stack>
    );
}

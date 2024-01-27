import React from 'react';
import {Participation} from "../tools/dto";
import {Avatar, Stack} from "@mui/material";
import Typography from "../components/Typography";
import {Icon} from "../components";
import {useDeleteParticipation} from "../tools/service";

interface ParticipationCardProps {
    participation: Participation
    isOrganizer?: boolean
    refetch: () => void
    variant?: 'idea' | 'project'
}

export function ParticipationCard({ participation, isOrganizer, refetch }: ParticipationCardProps) {
    const deleteParticipation = useDeleteParticipation()
    const onDeleteParticipation =  () => deleteParticipation.mutateAsync(participation).then(() => refetch())

    return (
        <Stack direction="row" alignItems="center" alignContent="center" spacing={1} justifyContent="space-between" style={{ borderRadius: 8, backgroundColor: 'white', padding: 8 }}>
            <Stack spacing={2} direction="row">
                <Avatar key={participation.user?.id} alt={participation.user?.title} src={participation.user?.image} />
                <span>
                    <Typography variant="Body-Bold">{participation.user?.title}</Typography>
                    <Typography variant="Body">, {participation.user?.age} лет</Typography>
                </span>
            </Stack>
            {isOrganizer && <Icon name="delete" onClick={onDeleteParticipation} />}
        </Stack>
    )
}

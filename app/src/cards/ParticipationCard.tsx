import React from 'react';
import {ParticipationUser} from "../tools/dto";
import {Avatar, Stack} from "@mui/material";
import Typography from "../components/Typography";
import {Icon} from "../components";
import {useDeleteParticipation} from "../tools/service";

interface ParticipationCardProps {
    participationUser: ParticipationUser
    isOrganizer?: boolean
    refetch: () => void
    variant?: 'idea' | 'project'
}

export function ParticipationCard({ participationUser, isOrganizer, refetch }: ParticipationCardProps) {
    const deleteParticipation = useDeleteParticipation()
    const onDeleteParticipation =  () => deleteParticipation.mutateAsync(participationUser).then(() => refetch())

    return (
        <Stack direction="row" alignItems="center" alignContent="center" spacing={1} justifyContent="space-between" style={{ borderRadius: 8, backgroundColor: 'white', padding: 8 }}>
            <Stack spacing={2} direction="row">
                <Avatar key={participationUser.userId} alt={participationUser.title} src={participationUser.image} />
                <span>
                    <Typography variant="Body-Bold">{participationUser.title}</Typography>
                    <Typography variant="Body">, {participationUser.age} лет</Typography>
                </span>
            </Stack>
            {isOrganizer && <Icon name="delete" onClick={onDeleteParticipation} />}
        </Stack>
    )
}

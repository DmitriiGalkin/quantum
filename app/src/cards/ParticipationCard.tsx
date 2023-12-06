import React from 'react';
import {ParticipationUser} from "../tools/dto";
import {Avatar, Stack} from "@mui/material";
import Typography from "../components/Typography";

interface ParticipationCardProps {
    participationUser: ParticipationUser
}

export function ParticipationCard({ participationUser }: ParticipationCardProps) {
    return (
        <Stack spacing={2} direction="row">
            <Avatar key={participationUser.userId} alt={participationUser.title} src={participationUser.image} />
            <Typography variant="Body">{participationUser.title}, {participationUser.age} лет</Typography>
        </Stack>
    );
}

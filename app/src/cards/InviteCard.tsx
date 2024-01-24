import React from 'react';
import {Invite, ParticipationUser} from "../tools/dto";
import {Avatar, Stack} from "@mui/material";
import Typography from "../components/Typography";
import {Icon} from "../components";
import {useDeleteParticipation} from "../tools/service";

interface InviteCardProps {
    invite: Invite
    refetch: () => void
}

export function InviteCard({ invite, refetch }: InviteCardProps) {

    return (
        <Stack direction="row" alignItems="center" alignContent="center" spacing={1} justifyContent="space-between" style={{ borderRadius: 8, backgroundColor: 'white', padding: 8 }}>
            <Stack spacing={2} direction="row">
                <span>
                    <Typography variant="Body-Bold">{invite.projectId}</Typography>
                    <Typography variant="Body">{invite.userId}</Typography>
                </span>
            </Stack>
        </Stack>
    )
}

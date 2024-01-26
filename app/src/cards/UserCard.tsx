import React from 'react';
import {ParticipationUser, User} from "../tools/dto";
import {Avatar, Stack} from "@mui/material";
import Typography from "../components/Typography";
import {useDeleteUser, useDeleteVisit} from "../tools/service";
import {Icon} from "../components";
import {useToggle} from "usehooks-ts";
import CreateMeet from "../dialogs/Meet";
import EditMeet from "../dialogs/User";

interface UserCardProps {
    user: User
    refetch: () => void
}

export function UserCard({ user, refetch }: UserCardProps) {
    const [edit, onClickEdit] = useToggle()

    return (
        <>
            <Stack spacing={2} direction="row" justifyContent="space-between" alignContent="center" style={{ borderRadius: 8, backgroundColor: 'white', padding: 8 }}>
                <Stack direction="row" alignContent="center">
                    <Avatar key={user.id} alt={user.title} src={user.image} sx={{ width: 72, height: 72}} />
                    <Stack spacing={1} style={{ padding: 12 }}>
                        <Typography variant="Header2">{user.title}</Typography>
                        <Typography variant="Body">{user.age} лет</Typography>
                    </Stack>
                    {true && <Icon name="edit" onClick={onClickEdit} />}
                </Stack>
            </Stack>
            <EditMeet userId={user.id} open={edit} onClose={() => { onClickEdit(); refetch() }} />
        </>
    );
}

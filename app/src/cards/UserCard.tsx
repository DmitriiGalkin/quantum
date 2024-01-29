import React from 'react';
import {User} from "../tools/dto";
import {Avatar, Stack} from "@mui/material";
import Typography from "../components/Typography";
import {useToggle} from "usehooks-ts";
import EditMeet from "../dialogs/EditUser";

interface UserCardProps {
    user: User
    refetch: () => void
}

export function UserCard({ user, refetch }: UserCardProps) {
    const [edit, onClickEdit] = useToggle()

    return (
        <>
            <Stack onClick={onClickEdit} spacing={2} direction="row" justifyContent="space-between" alignContent="center" style={{ borderRadius: 8, backgroundColor: 'white', padding: 8 }}>
                <Stack direction="row" alignContent="center">
                    <Avatar key={user.id} alt={user.title} src={user.image} sx={{ width: 72, height: 72}} />
                    <Stack spacing={1} style={{ padding: 12 }}>
                        <Typography variant="Header2">{user.title}</Typography>
                        <Typography variant="Body">{user.age} лет</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <EditMeet userId={user.id} open={edit} onClose={() => { onClickEdit(); refetch() }} />
        </>
    );
}

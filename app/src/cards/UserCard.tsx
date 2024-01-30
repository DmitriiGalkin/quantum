import React from 'react';
import {User} from "../tools/dto";
import {Avatar, Stack} from "@mui/material";
import Typography from "../components/Typography";
import {useToggle} from "usehooks-ts";
import EditMeet from "../dialogs/EditUser";
import {Card} from "../components";

interface UserCardProps {
    user: User
    refetch: () => void
}

export function UserCard({ user, refetch }: UserCardProps) {
    const [edit, onClickEdit] = useToggle()

    return (
        <>
            <Card onClick={onClickEdit}>
                <Stack spacing={2} direction="row" justifyContent="space-between" alignContent="center">
                    <Stack direction="row" alignContent="center">
                        <Avatar key={user.id} alt={user.title} src={user.image} sx={{ width: 72, height: 72}} />
                        <Stack spacing={1} style={{ padding: 12 }}>
                            <Typography variant="Header2">{user.title}</Typography>
                            <Typography variant="Body">{user.age} лет</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Card>
            <EditMeet userId={user.id} open={edit} onClose={() => { onClickEdit(); refetch() }} />
        </>
    );
}

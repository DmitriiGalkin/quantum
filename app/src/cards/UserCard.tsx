import React from 'react';
import {ParticipationUser, User} from "../tools/dto";
import {Avatar, Stack} from "@mui/material";
import Typography from "../components/Typography";
import {useDeleteUser, useDeleteVisit} from "../tools/service";
import {Icon} from "../components";

interface UserCardProps {
    user: User
    refetch: () => void
}

export function UserCard({ user, refetch }: UserCardProps) {
    const deleteUser = useDeleteUser()
    const onDeleteUser =  () => deleteUser.mutateAsync(user).then(() => refetch())

    return (
        <Stack spacing={2} direction="row" justifyContent="space-between" alignContent="center" style={{ borderRadius: 8, backgroundColor: 'white', padding: 8 }}>
            <Stack direction="row" spacing={1} alignContent="center">
                <Avatar key={user.id} alt={user.title} src={user.image} />
                <Typography variant="Body">{user.title}, {user.age} лет</Typography>
            </Stack>
            <Icon name="delete" onClick={onDeleteUser} />
        </Stack>
    );
}

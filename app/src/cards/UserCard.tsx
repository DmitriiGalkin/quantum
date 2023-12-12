import React from 'react';
import {ParticipationUser, User} from "../tools/dto";
import {Avatar, Stack} from "@mui/material";
import Typography from "../components/Typography";
import {useDeleteUser, useDeleteVisit} from "../tools/service";
import {Icon} from "../components";
import { useLocalStorage } from 'usehooks-ts'

interface UserCardProps {
    user: User
    refetch: () => void
}

export function UserCard({ user, refetch }: UserCardProps) {
    const deleteUser = useDeleteUser()
    const [selectedUserId, setSelectedUserId] = useLocalStorage('selectedUserId', 0)
    const onSelectUser = () => setSelectedUserId(user.id)
    const onDeleteUser =  () => deleteUser.mutateAsync(user).then(() => refetch())

    return (
        <Stack spacing={2} direction="row">
            <Avatar key={user.id} alt={user.title} src={user.image} />
            <Typography variant="Body">{user.title}, {user.age} лет</Typography>
            <Icon onClick={onDeleteUser} name="delete" />
        </Stack>
    );
}

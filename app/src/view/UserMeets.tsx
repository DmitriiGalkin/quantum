import React, {useEffect, useState} from 'react';
import {useUpdateUser, useUser, useUserMeets} from "../tools/service";
import {User} from "../tools/dto";
import {Stack} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Button, DialogHeader, ImageField, Input, MeetCard} from "../components";
import {useAuth} from "../tools/auth";

export interface UserMeetsProps {
    onClose: () => void
}
export default function UserMeets({ onClose }: UserMeetsProps) {
    const { data: userMeets, refetch } = useUserMeets();

    return (
        <>
            <DialogHeader title="Посещения" onClick={onClose}/>
            <Stack spacing={2} style={{ backgroundColor: '#F5F5F5', padding: '15px' }}>
                {userMeets?.map((meet) =>
                    <div key={meet.id}>
                        <MeetCard meet={meet} refetch={refetch} />
                    </div>
                )}
            </Stack>
        </>
    );
}
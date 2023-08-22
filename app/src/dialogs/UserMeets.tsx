import React from 'react';
import {useUserMeets} from "../tools/service";
import {Stack} from "@mui/material";
import {DialogHeader, MeetCard} from "../components";

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
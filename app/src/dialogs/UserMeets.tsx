import React from 'react';
import {useUserMeets} from "../tools/service";
import {Stack} from "@mui/material";
import {DialogHeader, MeetCard} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";

export interface UserMeetsProps {
    onClose: () => void
}
function UserMeets({ onClose }: UserMeetsProps) {
    const { data: userMeets, refetch } = useUserMeets();

    return (
        <>
            <DialogHeader title="Посещения" onClick={onClose}/>
            <DialogContent>
                <Stack spacing={2}>
                    {userMeets?.map((meet) =>
                        <div key={meet.id}>
                            <MeetCard meet={meet} refetch={refetch} />
                        </div>
                    )}
                </Stack>
            </DialogContent>
        </>
    );
}
export default withDialog(UserMeets)

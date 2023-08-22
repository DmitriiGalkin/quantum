import React from 'react';
import {useUserMeets} from "../tools/service";
import {Stack} from "@mui/material";
import {DialogHeader, MeetCard, TransitionDialog} from "../components";
import Dialog from "@mui/material/Dialog";
import {DialogContent} from "../components/DialogContent";

export interface UserMeetsProps {
    open: boolean
    onClose: () => void
}
export default function UserMeets({ open, onClose }: UserMeetsProps) {
    const { data: userMeets, refetch } = useUserMeets();

    return (
        <Dialog onClose={onClose} open={open} fullScreen TransitionComponent={TransitionDialog}>
            <DialogHeader title="Посещения" onClick={onClose}/>
            <DialogContent>
                <Stack spacing={2} style={{ backgroundColor: '#F5F5F5', padding: '15px' }}>
                    {userMeets?.map((meet) =>
                        <div key={meet.id}>
                            <MeetCard meet={meet} refetch={refetch} />
                        </div>
                    )}
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
import React from 'react';
import {useVisits} from "../tools/service";
import {Stack} from "@mui/material";
import {DialogHeader, MeetCard} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";

export interface UserMeetsProps {
    onClose: () => void
}
function Visits({ onClose }: UserMeetsProps) {
    const { data: userMeets, refetch } = useVisits();

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
export default withDialog(Visits)

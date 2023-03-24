import React from 'react';
import {Meet, useAddMeetUser, useDeleteMeetUser} from "../modules/meet";
import {convertToMeetTime} from "../tools/date";
import {Avatar, AvatarGroup, Box, Typography} from "@mui/material";
import {useUnit} from "../tools/hooks";
import QAvatar from "./QAvatar";

export default function MeetCard(meet: Meet) {
    const unit = useUnit()
    const time = convertToMeetTime(meet.datetime)
    const active = meet.users?.find((user) => user.id === unit.id) // TODO: убрать в бек

    const addMeetUser = useAddMeetUser(meet.projectId)
    const deleteMeetUser = useDeleteMeetUser(meet.projectId)

    const onClick = () => {
        if (active) {
            deleteMeetUser.mutate({ meetId: meet.id })
        } else {
            addMeetUser.mutate({ meetId: meet.id })
        }
    }

    return (
        <Box style={{ padding: '8px 16px', backgroundColor: active ? 'rgba(255,204,0,0.2)' : undefined }} onClick={onClick}>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Box style={{ flexGrow: 1 }}>
                    <Typography variant="h6">
                        {meet.project?.title}
                    </Typography>
                    <Box sx={{ display: 'flex', paddingTop: 1 }}>
                        <AvatarGroup max={active ? 5 : 4} >
                            {meet.users?.map((user) => <QAvatar key={user.id} {...user} />)}
                        </AvatarGroup>
                    </Box>
                </Box>
                <Typography variant="subtitle1">
                    {time}
                </Typography>
            </Box>
        </Box>
    );
}

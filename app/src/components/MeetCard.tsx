import React from 'react';
import {Meet} from "../modules/meet";
import {convertToMeetTime} from "../tools/date";
import {AvatarGroup, Box, Typography} from "@mui/material";
import QAvatar from "./QAvatar";
import {useUser} from "../modules/user";

interface MeetCardProps {
    meet: Meet
    onClickEnter?: () => void
    onClickLeave?: () => void
}

export const SELECTED_COLOR = '#CDEBFC'
export const DEFAULT_COLOR = '#E1F1FA'

export default function MeetCard({ meet, onClickEnter, onClickLeave }: MeetCardProps) {
    const { data: user } = useUser()
    const time = convertToMeetTime(meet.datetime)
    const active = user && meet.users.map((user) => user.id).includes(user.id)

    const onClick = () => {
        if (active) {
            onClickLeave && onClickLeave()
        } else {
            onClickEnter && onClickEnter()
        }
    }

    return (
        <Box style={{ height: 75, padding: '8px 16px', backgroundColor: active ? SELECTED_COLOR : DEFAULT_COLOR }} onClick={onClick}>
            <Box style={{ display: 'flex' }}>
                <Box style={{ flexGrow: 1 }}>
                    <Typography variant="h6">
                        {meet.project?.title}
                    </Typography>
                    <Box sx={{ display: 'flex', paddingTop: 1 }}>
                        <AvatarGroup max={meet.active ? 8 : 7}  sx={{
                            '& .MuiAvatar-root': { width: 30, height: 30, fontSize: 15 },
                        }}>
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

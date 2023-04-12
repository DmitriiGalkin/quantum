import React from 'react';
import {Meet} from "../../modules/meet";
import {convertToMeetTime} from "../../tools/date";
import {AvatarGroup, Box, Typography} from "@mui/material";
import QAvatar from "../QAvatar";
import {useToggleMeetUser} from "../../modules/user";
import QCard from "../QCard";
import {useProfileContext} from "../../layouts/ProfileLayout";

interface MeetCardProps {
    meet: Meet
}

export default function MeetCard({ meet }: MeetCardProps) {
    const { meetIds, refetchProfile } = useProfileContext();
    const toggleMeetUser = useToggleMeetUser()

    const time = convertToMeetTime(meet.datetime)
    const active = meetIds?.includes(meet.id)
    const onClick = () => toggleMeetUser.mutateAsync({ meetId: meet.id }).then(() => {
        refetchProfile()
    })

    return (
        <QCard onClick={onClick} active={active}>
            <Box style={{ display: 'flex', height: 95 }}>
                <Box style={{ flexGrow: 1 }}>
                    <Typography variant="h6">
                        {meet.project?.title}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        {meet.place?.title}
                    </Typography>
                    {Boolean(meet.users.length) ? (
                        <Box sx={{ display: 'flex', paddingTop: 1 }}>
                            <AvatarGroup max={meet.active ? 8 : 7}  sx={{
                                '& .MuiAvatar-root': { width: 30, height: 30, fontSize: 15 },
                            }}>
                                {meet.users?.map((user) => <QAvatar key={user.id} {...user} />)}
                            </AvatarGroup>
                        </Box>
                    ) : (
                        <Typography variant="body2">
                            Участников нет
                        </Typography>
                    )}
                </Box>
                <Typography variant="subtitle1">
                    {time}
                </Typography>
            </Box>
        </QCard>
    );
}

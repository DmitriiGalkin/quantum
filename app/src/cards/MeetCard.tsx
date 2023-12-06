import React from 'react';
import {Meet, Visit} from "../tools/dto";
import {convertToMeetDate, convertToMeetTime, convertToObject} from "../tools/date";
import {Avatar, AvatarGroup, Box, Chip, Stack} from "@mui/material";
import {useCreateVisit, useDeleteVisit} from "../tools/service";
import {makeStyles} from '@mui/styles';
import {BOX_SHADOW, DEFAULT_COLOR} from "../tools/theme";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../tools/auth";
import {getAgeLabel} from "../tools/helper";
import Typography from "../components/Typography";
import {useToggle} from "usehooks-ts";
import CreateMeet from "../dialogs/CreateMeet";
import {Button} from "../components";

interface MeetCardProps {
    meet: Meet
    selected?: boolean
    refetch?: () => void
}

export function MeetCard({ meet, refetch }: MeetCardProps) {
    const { isAuth, user, openLogin } = useAuth();
    const createVisit = useCreateVisit()
    const deleteVisit = useDeleteVisit()

    const { time, shortMonth, day } = convertToObject(meet.datetime)

    const visit = meet.visits?.find(({ userId }) => userId === user.id)
    const isOrganizer = user && (meet.userId === user.id)
    const [create, toggleCreate] = useToggle()

    const onClickCreateVisit = () => {
        if (isAuth && user) {
            createVisit.mutateAsync({ userId: user.id, meetId: meet.id }).then(refetch)
        } else {
            openLogin()
        }
    }
    const onDeleteVisit = (visit: Visit) => {
        deleteVisit.mutateAsync(visit).then(refetch)
    }

    return (
        <Stack spacing={2} direction="row" style={{ padding: '18px 0'}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: 33, lineHeight: '33px' }}>{day}</div>
                <div style={{ fontSize: 13, paddingTop: 4 }}>{shortMonth}</div>
            </div>
            <div style={{ flexGrow: 1 }}>
                <div>
                    <Stack direction="row" justifyContent="space-between" alignContent="center">
                        <Stack spacing={1} direction="row" alignContent="center" alignItems="center">
                            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 5.53211C11 2.47706 8.53731 0 5.5 0C2.46269 0 0 2.47706 0 5.53211C0 7.15596 0.693201 8.61468 1.80141 9.62385C1.80141 9.62844 1.80597 9.63303 1.80597 9.63303L4.92081 12.7661C5.23093 13.078 5.73715 13.078 6.05182 12.7661C6.05182 12.7661 9.39013 9.44495 9.55431 9.26606C10.4527 8.2844 11 6.97248 11 5.53211Z" fill="#7139FF"/>
                                <path d="M8 5.5C8 6.88333 6.88333 8 5.5 8C4.11667 8 3 6.87778 3 5.5C3 4.12222 4.11667 3 5.5 3C6.87778 3 8 4.12222 8 5.5Z" fill="white"/>
                            </svg>
                            <Typography variant="Body">{meet.placeTitle}</Typography>
                        </Stack>
                        <Typography variant="Body2-Bold" color="primary">{time}</Typography>
                    </Stack>
                    <div style={{ flex: '1 0 auto', display: 'flex', height: 30, paddingTop: 8 }}>
                        <div style={{ flexGrow: 1 }}>
                            {Boolean(meet.visits?.length) && (
                                <Box sx={{ display: 'flex' }}>
                                    <AvatarGroup max={4}>
                                        {meet.visits?.map((visitUser) => {
                                            return user ? <Avatar key={visitUser.userId} alt={visitUser.title} src={visitUser.image} sx={{ width: 21, height: 21 }} /> : null
                                        })}
                                    </AvatarGroup>
                                </Box>
                            )}
                        </div>
                        {isOrganizer ? (
                            <Button variant="small" onClick={toggleCreate}>Управление</Button>
                        ) : (
                            <>
                                {visit ? (
                                    <Button variant="small2" onClick={() => visit && onDeleteVisit(visit)}>Участвую</Button>
                                ) : (
                                    <Button variant="small" onClick={onClickCreateVisit}>Участвовать</Button>
                                )}
                            </>
                        )}
                    </div>
                    <CreateMeet meetId={meet.id} open={create} onClose={toggleCreate} />
                </div>
            </div>
        </Stack>
    );
}

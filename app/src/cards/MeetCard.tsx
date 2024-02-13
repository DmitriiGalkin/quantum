import React from 'react';
import {Meet, Visit} from "../tools/dto";
import {convertToObject} from "../tools/date";
import {Avatar, AvatarGroup, Box, Stack} from "@mui/material";
import {useCreateVisit, useDeleteVisit} from "../tools/service";
import {useAuth} from "../tools/auth";
import Typography from "../components/Typography";
import {useToggle} from "usehooks-ts";
import EditMeet from "../dialogs/EditMeet";
import {Button, Card} from "../components";
import {Parameter} from "../components/Parameter";
import {COLOR, COLOR_DEFAULT} from "../tools/theme";

interface MeetCardProps {
    meet: Meet
    selected?: boolean
    refetch: () => void
    showDate?: boolean
}

export function MeetCard({ meet, refetch, showDate }: MeetCardProps) {
    const { isAuth, user, openLogin, passport } = useAuth();
    const createVisit = useCreateVisit()
    const deleteVisit = useDeleteVisit()

    const { time, shortMonth, day } = convertToObject(meet.datetime)

    const visit = user && (meet.visits || []).find(({ userId }) => userId === user.id)
    const isOrganizer = passport && (meet.passportId === passport.id)
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
    const onCloseCreateMeet = () => {
        toggleCreate()
        refetch()
    }

    return (
        <>
            <Card onClick={isOrganizer ? toggleCreate : undefined}>
                <Stack direction="row">
                    {meet.project && (
                        <div>
                            <div style={{borderRadius: '8px 0 0 8px', height: '100%', display: 'flex', width: 60, backgroundImage: `url(${meet.project.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
                        </div>
                    )}
                    {showDate && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 60, justifyContent: 'center' }}>
                            <div style={{ fontSize: 33, lineHeight: '33px' }}>{day}</div>
                            <div style={{ fontSize: 13, paddingTop: 4 }}>{shortMonth}</div>
                        </div>
                    )}
                    <div style={{ flexGrow: 1, padding: 12 }}>
                        <Stack spacing={1}>
                            {meet.project && <Typography variant="Header2">{meet.project?.title}</Typography>}
                            <Stack spacing={1}>
                                {meet.project?.place && <Parameter variant="primary" name="place2" title={meet.project?.place.title} />}
                                <Stack direction="row" alignContent="center" spacing={1} justifyContent="space-between">
                                    <Stack direction="row" alignContent="center" spacing={2}>
                                        {time && <Parameter variant="secondary" name="time2" title={time} />}
                                        {meet.duration && <Parameter variant="secondary" name="timer" title={meet.duration} />}
                                        {meet.price && <Parameter variant="secondary" name="ruble" title={meet.price} />}
                                    </Stack>
                                </Stack>
                            </Stack>
                            <div style={{ flex: '1 0 auto', display: 'flex' }}>
                                <div style={{ flexGrow: 1 }}>
                                    {Boolean(meet.visits?.length) && (
                                        <Box sx={{ display: 'flex' }}>
                                            <AvatarGroup max={4}>
                                                {meet.visits?.map((visit) => {
                                                    return visit.user ? <Avatar key={visit.user.id} alt={visit.user.title} src={visit.user.image} sx={{ width: 21, height: 21, borderColor: `${visit.started && !visit.stopped ? COLOR : COLOR_DEFAULT} !important` }} /> : null
                                                })}
                                            </AvatarGroup>
                                        </Box>
                                    )}
                                </div>
                                {visit ? (
                                    <Button variant="small2" onClick={(e) => { visit && onDeleteVisit(visit); e.stopPropagation()} }>Участвую</Button>
                                ) : (
                                    <Button variant="small" onClick={e=> {onClickCreateVisit(); e.stopPropagation()}}>Участвовать</Button>
                                )}
                            </div>

                        </Stack>
                    </div>
                </Stack>
            </Card>
            <EditMeet meetId={meet.id} open={create} onClose={onCloseCreateMeet} />
        </>
    );
}

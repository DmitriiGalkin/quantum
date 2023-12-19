import React from 'react';
import {Meet, Place, Project, Visit} from "../tools/dto";
import {convertToObject} from "../tools/date";
import {Avatar, AvatarGroup, Box, Stack} from "@mui/material";
import {useCreateVisit, useDeleteVisit} from "../tools/service";
import {useAuth} from "../tools/auth";
import Typography from "../components/Typography";
import {useToggle} from "usehooks-ts";
import CreateMeet from "../dialogs/CreateMeet";
import {Button, Icon} from "../components";
import {Parameter} from "../components/Parameter";

interface MeetCardProps {
    meet: Meet
    selected?: boolean
    refetch?: () => void
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

    return (
        <Stack direction="row" style={{ borderRadius: 8, backgroundColor: 'white', position: 'relative' }}>
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
                <Stack direction="column" spacing={1}>
                    {meet.project && (
                        <Typography variant="Header2">{meet.project?.title}</Typography>
                    )}
                    <Stack direction="row" alignContent="center" spacing={1} justifyContent="space-between">
                        <Stack direction="row" alignContent="center" spacing={2}>
                            {meet.project?.place && <Parameter name="place2" title={meet.project?.place?.title} />}
                            <Parameter name="time2" title={time} />
                        </Stack>
                        {isOrganizer && <Icon name="edit" onClick={toggleCreate} />}
                    </Stack>

                    <div style={{ flex: '1 0 auto', display: 'flex' }}>
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
                        {visit ? (
                            <Button variant="small2" onClick={() => visit && onDeleteVisit(visit)}>Участвую</Button>
                        ) : (
                            <Button variant="small" onClick={onClickCreateVisit}>Участвовать</Button>
                        )}
                    </div>
                    <CreateMeet meetId={meet.id} open={create} onClose={toggleCreate} />
                </Stack>
            </div>
        </Stack>
    );
}

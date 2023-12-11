import React from 'react';
import {Meet, Visit} from "../tools/dto";
import {convertToObject} from "../tools/date";
import {Avatar, AvatarGroup, Box, Stack} from "@mui/material";
import {useCreateVisit, useDeleteVisit} from "../tools/service";
import {useAuth} from "../tools/auth";
import Typography from "../components/Typography";
import {useToggle} from "usehooks-ts";
import CreateMeet from "../dialogs/CreateMeet";
import {Button, Icon} from "../components";

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
                            <Icon name="place2" />
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

import React, {useState} from 'react';
import {Meet, NewMeet} from "../../modules/meet";
import {convertToMeetTime} from "../../tools/date";
import {AvatarGroup, Box, Menu, MenuItem, Typography} from "@mui/material";
import QAvatar from "../QAvatar";
import {useDeleteMeet, useToggleMeetUser} from "../../modules/user";
import QCard from "../QCard";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "../TransitionDialog";
import CreateMeet from "../../dialogs/CreateMeet";

interface MeetCardProps {
    meet: Meet
    refetch: () => void
}

export default function MeetCard({ meet, refetch }: MeetCardProps) {
    const toggleMeetUser = useToggleMeetUser()
    const deleteMeet = useDeleteMeet()

    const [contextMenu, setContextMenu] = React.useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);
    const [newMeet, setNewMeet] = useState<NewMeet>()

    const time = convertToMeetTime(meet.datetime)
    const onClick = () => {
        contextMenu === null && toggleMeetUser.mutateAsync({ meetId: meet.id }).then(() => {
            refetch()
        })
    }
    const title = meet.title ? meet.title : meet.project?.title
    const description = meet.title ? meet.project?.title + ', ' + meet.place?.title : meet.place?.title


    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                  // Other native context menus might behave different.
                  // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                null,
        );
    };

    const handleClose = () => {
        setContextMenu(null)
    };
    const onEditClick = () => {
        setNewMeet(meet as NewMeet)
        handleClose()
    };
    const onDeleteClick = () => {
        deleteMeet.mutateAsync(meet).then(() => {
            refetch()
        })
        handleClose()
    };

    return (
        <QCard onClick={onClick} active={meet.active} onContextMenu={handleContextMenu}>
            <Box style={{ display: 'flex', height: 95 }}>
                <Box style={{ flexGrow: 1 }}>
                    <Typography variant="h6" onContextMenu={()=>console.log('1')}>
                        {title}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        {description}
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
                        <Typography variant="body2" color="textSecondary">
                            Участников нет
                        </Typography>
                    )}
                </Box>
                <Typography variant="subtitle1">
                    {time}
                </Typography>
            </Box>
            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={onEditClick}>Редактировать</MenuItem>
                <MenuItem onClick={onDeleteClick}>Удалить</MenuItem>
            </Menu>
            <Dialog onClose={() => setNewMeet(undefined)} open={!!newMeet} fullScreen TransitionComponent={TransitionDialog}>
                {!!newMeet && (<CreateMeet newMeet={newMeet} onClose={() => setNewMeet(undefined)} />)}
            </Dialog>
        </QCard>
    );
}

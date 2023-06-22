import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import {Avatar, AvatarGroup, Box, Button, Stack, Theme, Typography} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import {useAddProjectUser, useDeleteProjectUser, useToggleMeetUser} from "../modules/user";
import {Project, useProject} from "../modules/project";
import {getMeetsGroup} from "../tools/helper";
import Day from "../components/Day";
import {Meet, NewMeet, useMeet} from "../modules/meet";
import QAvatar from "../components/QAvatar";
import {useParams} from "react-router-dom";
import CreateMeet from "../dialogs/CreateMeet";
import Back2 from "../components/Back2";
import {getOnShare} from "../tools/share";
import QContainer from "../components/QContainer";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "../components/TransitionDialog";
import CreateProjectDialog from "../dialogs/CreateProject";
import Image from "../components/Image";

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        position: 'absolute',
        top: -38,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: `38px 38px 0 0`,
        padding: '25px 33px'
    },
    block: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 12,
        padding: 12,
    },
    large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    image: {
        width: '100%',
        height: 300,
        objectFit: 'cover',
    },
}));

export default function MeetPage() {
    const { id: meetId } = useParams();
    const { data: meet, refetch } = useMeet(Number(meetId))

    const classes = useStyles();
    const [editMeet, setEditMeet] = useState<Meet>()

    const toggleMeetUser = useToggleMeetUser()

    if (!meet) { return null }

    const onClick = () => {
        toggleMeetUser.mutateAsync({ meetId: meet.id }).then(() => {
            refetch()
        })
    }

    const menuItems = [
        { title: 'Поделиться', onClick: getOnShare({
                title: meet?.title,
                url: `/meet/${meet?.id}`
            })},
        { title: 'Редактировать', onClick: () => setEditMeet(meet)},
        { title: 'Выйти из проекта', onClick: () => onClick()},
    ]
    const parameters = [
        {
            title: 'Дата',
            value: 'Июнь 15',
        },
        {
            title: 'Начало',
            value: '19:00',
        },
        {
            title: 'Длительность',
            value: '3ч 30м',
        },
        {
            title: 'Место',
            value: 'Лесной дом',
        }
    ]

    return (
        <div style={{ position: "relative"}}>
            <img src={meet.project.image} className={classes.image}/>
            <div style={{ position: "absolute", top: 25, left: 21, right: 25 }}>
                <Back2 title={meet.title} menuItems={menuItems} />
            </div>
            <div style={{ position: "relative"}}>
                <div className={classes.container}>
                    <Typography variant="h1">
                        {meet.title || 'Эпоксидная смола'}
                    </Typography>
                    <Typography variant="body1" style={{ paddingTop: 31}}>
                        Изготовление изделий из эпоксидной смолы, изучение различных техник заливки, форм, цветов, текстур.
                    </Typography>
                    <div style={{ paddingTop: 50}}>
                        <Typography variant="body1">
                            Участники
                        </Typography>
                        {Boolean(meet.users.length) ? (
                            <Box sx={{ display: 'flex', paddingTop: 1 }}>
                                <AvatarGroup max={4}>
                                    {meet.users.map((user) => (
                                        <Avatar alt={user.title} src={user.image} />
                                    ))}
                                </AvatarGroup>
                            </Box>
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                Участников нет
                            </Typography>
                        )}
                    </div>
                    <div id="parameters" style={{ paddingTop: 50}}>
                        {parameters.map(({ title, value }, index) => (
                            <Stack spacing={2} direction="row" justifyContent="space-between" style={{ paddingTop: 10 }}>
                                <Typography variant="h5">
                                    {title}
                                </Typography>
                                <Typography variant="h5" style={{ color: '#7139FF' }}>
                                    {value}
                                </Typography>
                            </Stack>
                        ))}
                    </div>
                    <div style={{ paddingTop: 50}}>
                        <img src="/1686906706498.jpg" style={{ width: '100%', display: 'block' }}/>
                    </div>
                    <div style={{ paddingTop: 22, marginLeft: -11, marginRight: -11 }}>
                        {meet.active ? (
                            <Button
                                color="success"
                                disabled={false}
                                size="large"
                                variant="outlined"
                                onClick={onClick}
                                fullWidth
                            >
                                Покинуть встречу
                            </Button>
                        ) : (
                            <Button
                                color="success"
                                disabled={false}
                                size="large"
                                variant="contained"
                                onClick={onClick}
                                fullWidth
                            >
                                участвовать
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <Dialog onClose={() => setEditMeet(undefined)} open={!!editMeet} fullScreen TransitionComponent={TransitionDialog}>
                {!!editMeet && (<CreateMeet onClose={() => {
                    setEditMeet(undefined)
                    refetch()
                }} />)}
            </Dialog>
        </div>
    );
}

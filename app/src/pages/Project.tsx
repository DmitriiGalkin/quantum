import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import {Box, Button, Container, Stack, Theme, Typography} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import {useAddMeetUser, useAddProjectUser, useDeleteMeetUser, useDeleteProjectUser, useUser} from "../modules/user";
import {useProject} from "../modules/project";
import {getMeetsGroup} from "../tools/helper";
import Day from "../components/Day";
import {Meet, NewMeet} from "../modules/meet";
import QAvatar from "../components/QAvatar";
import {useParams} from "react-router-dom";
import CreateMeet from "../dialogs/CreateMeet";
import Back from "../components/Back";
import {getOnShare} from "../tools/share";
import QContainer from "../components/QContainer";

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: `${theme.spacing(4)}px ${theme.spacing(4)}px 0 0`,
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
}));

export default function Project() {
    const { id: projectId } = useParams();
    const { data: user } = useUser()


    const { data: project, refetch } = useProject(Number(projectId))
    const active = user && project?.users.map(({ id}) => id).includes(user.id)

    const classes = useStyles();
    const [openCreateMeet, setOpenCreateMeet] = useState<NewMeet>()

    const addProjectUser = useAddProjectUser(project?.id)
    const deleteProjectUser = useDeleteProjectUser(project?.id)
    const addMeetUser = useAddMeetUser(Number(projectId))
    const deleteMeetUser = useDeleteMeetUser(Number(projectId))

    if (!project) { return null }

    const meetsGroup = getMeetsGroup(project?.meets)

    const onClick = () => {
        if (active) {
            deleteProjectUser.mutate({ projectId: project.id })
        } else {
            addProjectUser.mutate({ projectId: project.id })
        }
    }

    const onClickEnter = active ? ((meetId: number) => () => addMeetUser.mutate({ meetId })) : undefined
    const onClickLeave = active ? ((meetId: number) => () => deleteMeetUser.mutate({ meetId })) : undefined
    const menuItems = [
        { title: 'Новая встреча', onClick: () => {
                setOpenCreateMeet({ projectId: project?.id, activeStep: 1 })
            }},
        { title: 'Поделиться', onClick: getOnShare({
                title: project?.title,
                text: project?.description,
                url: `/project/${project?.id}`
            })},
        { title: 'Выйти из проекта', onClick: () => onClick()},
    ]

    return (
        <>
            <Back title={project.title} menuItems={menuItems} />
            <div className={classes.container}>
                <QContainer>
                    <Stack spacing={3}>
                        <Typography>
                            {project.description}
                        </Typography>
                        {!active && (
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<SaveIcon />}
                                onClick={onClick}
                            >
                                Участвовать в проекте
                            </Button>
                        )}
                        {Boolean(project.meets.length) && (
                            <div>
                                {meetsGroup.map(([date, meets]) => (
                                    <Day key={date} date={date} meets={meets as Meet[]} onClickEnter={onClickEnter} onClickLeave={onClickLeave}/>
                                ))}
                            </div>
                        )}
                        <Stack spacing={2}>
                            <Typography variant="h5">
                                Участники
                            </Typography>
                            <div>
                                {project.users?.map((user) => (
                                    <Box key={user.id} sx={{padding: 1, display: "flex"}}>
                                        <QAvatar {...user}/>
                                        <Box sx={{flexGrow:1, paddingLeft: 2}}>
                                            <Typography variant="subtitle1">
                                                {user.title}
                                            </Typography>
                                            <Typography>
                                                Вдохновитель
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </div>
                        </Stack>
                    </Stack>
                </QContainer>
            </div>
            <CreateMeet openCreateMeet={openCreateMeet} onClose={() => {
                setOpenCreateMeet(undefined)
                refetch()
            }} />
        </>
    );
}

import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import {Box, Button, Stack, Theme, Typography} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import {useAddProjectUser, useDeleteProjectUser} from "../modules/user";
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
import {useProfileContext} from "../layouts/ProfileLayout";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "../components/TransitionDialog";

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
    const { projectIds } = useProfileContext();
    const { data: project, refetch } = useProject(Number(projectId))

    const active = projectIds?.includes(Number(projectId))
    const classes = useStyles();
    const [newMeet, setNewMeet] = useState<NewMeet>()

    const addProjectUser = useAddProjectUser(project?.id)
    const deleteProjectUser = useDeleteProjectUser(project?.id)

    if (!project) { return null }

    const meetsGroup = getMeetsGroup(project?.meets)

    const onClick = () => {
        if (active) {
            deleteProjectUser.mutate({ projectId: project.id })
        } else {
            addProjectUser.mutate({ projectId: project.id })
        }
    }

    const menuItems = [
        { title: 'Новая встреча', onClick: () => setNewMeet({ projectId: project?.id, activeStep: 1 })},
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
                                    <Day key={date} date={date} meets={meets as Meet[]} />
                                ))}
                            </div>
                        )}
                        {Boolean(project.users?.length) && (
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
                        )}
                    </Stack>
                </QContainer>
            </div>
            <Dialog onClose={() => setNewMeet(undefined)} open={!!newMeet} fullScreen TransitionComponent={TransitionDialog}>
                {!!newMeet && (<CreateMeet newMeet={newMeet} onClose={() => {
                    setNewMeet(undefined)
                    refetch()
                }} />)}
            </Dialog>
        </>
    );
}

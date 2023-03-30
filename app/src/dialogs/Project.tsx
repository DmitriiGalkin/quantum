import React from 'react';
import {makeStyles} from '@mui/styles';
import {Avatar, Box, Button, Container, Stack, Theme, Typography} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import PenIcon from "@mui/icons-material/Edit";
import ForwardAppBar from "../components/ForwardAppBar";
import {useNavigate} from "react-router-dom";
import {useAddProjectUser, useDeleteProjectUser} from "../modules/user";
import {useProject} from "../modules/project";
import {getMeetsGroup} from "../tools/helper";
import Day from "../components/Day";
import {Meet} from "../modules/meet";
import Dialog from "@mui/material/Dialog";

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

export interface ProjectDialogProps {
    projectId: number;
    onClose: () => void;
}
export default function ProjectDialog({ projectId, onClose }: ProjectDialogProps) {
    const classes = useStyles();
    const navigate = useNavigate();

    const { data: project } = useProject(projectId)


    const addProjectUser = useAddProjectUser(projectId)
    const deleteProjectUser = useDeleteProjectUser(projectId)

    if (!project) { return null }

    const meetsGroup = getMeetsGroup(project.meets)

    const onClick = () => {
        if (project.active) {
            deleteProjectUser.mutate({ projectId })
        } else {
            addProjectUser.mutate({ projectId })
        }
    }

    return (
        <Dialog onClose={onClose} open={true} fullScreen>
            <ForwardAppBar title={project.title} icon={<PenIcon style={{ color: 'white' }}/>} onClick={onClose}/>
            <div className={classes.container}>
                <Container disableGutters sx={{ padding: '24px 18px' }}>
                    <Stack spacing={2}>
                        <Typography>
                            {project.description}
                        </Typography>
                        <Box className={classes.block}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<SaveIcon />}
                                onClick={onClick}
                            >
                                {project.active ? 'Покинуть проект' : 'Участвовать в проекте'}
                            </Button>
                        </Box>
                        <div className={classes.block}>
                            <Typography variant="h5">
                                Встречи
                            </Typography>
                            {meetsGroup.map(([date, meets]) => (
                                <Day key={date} date={date} meets={meets as Meet[]}/>
                            ))}
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<SaveIcon />}
                                onClick={() => navigate(`/meet`)}
                            >
                                Создать встречу
                            </Button>
                        </div>
                        <div className={classes.block}>
                            <Typography variant="h5">
                                Участники
                            </Typography>
                            {project.users?.map((user) => (
                                <Box key={user.id} sx={{padding: 1, display: "flex"}}>
                                    <Avatar
                                        alt={user.title}
                                        src={user.image}
                                        className={classes.large}
                                    />
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
                </Container>
            </div>
        </Dialog>
    );
}

import React from 'react';
import {makeStyles} from '@mui/styles';
import {
    Avatar,
    Box,
    Button,
    Container,
    Stack,
    Theme,
    Typography
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import PenIcon from "@mui/icons-material/Edit";
import ForwardAppBar from "../components/ForwardAppBar";
import {useNavigate, useParams} from "react-router-dom";
import {
    Project,
    useAddProjectUser,
    useDeleteProjectUser,
    useProject,
    useProjectMeets,
    useProjectUsers
} from "../modules/project";
import {getMeetsGroup} from "../tools/helper";
import Day from "../components/Day";
import {Meet} from "../modules/meet";

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

export default function ProjectPage() {
    const classes = useStyles();
    const navigate = useNavigate();

    const { id } = useParams();
    const { data: project = {} as Project } = useProject(Number(id))
    const { data: meets = [] } = useProjectMeets(Number(id))
    const { data: users = [] } = useProjectUsers(Number(id))
    const addProjectUser = useAddProjectUser(Number(id))
    const deleteProjectUser = useDeleteProjectUser(Number(id))
    const meetsGroup = getMeetsGroup(meets)

    const onClick = () => {
        if (project.active) {
            deleteProjectUser.mutate({ projectId: project.id })
        } else {
            addProjectUser.mutate({ projectId: project.id })
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <ForwardAppBar title={project.title} icon={<PenIcon style={{ color: 'white' }}/>} onClick={() => navigate(`/project/${project.id}/edit` )}/>
            <div className={classes.container}>
                <Container disableGutters sx={{ padding: '24px 18px' }}>
                    <Stack spacing={2}>
                        <Typography variant="h5">
                            {project.title}
                        </Typography>
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
                        {project.place && (
                            <div className={classes.block}>
                                <Typography variant="h5">
                                    Место проведения
                                </Typography>
                                <Box sx={{padding: 1, display: "flex"}}>
                                    <Box>
                                        <Typography variant="h5">
                                            {project.place.title}
                                        </Typography>
                                        <Typography>
                                            {project.place.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </div>
                        )}
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
                            {users.map((user) => (
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
        </Box>
    );
}

import React from 'react';
import ProjectCard from "../components/ProjectCard";
import {Alert, Box, Fab, Link, Stack, Theme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import QZoom from "../components/QZoom";
import AddIcon from "@mui/icons-material/Add";
import {makeStyles} from "@mui/styles";
import {useOnlyUserProjects} from "../modules/user";

const useStyles = makeStyles((theme: Theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));
export default function ProjectsPage() {
    const classes = useStyles();
    const navigate = useNavigate();
    const { data: projects = [] } = useOnlyUserProjects()

    return (
        <Stack spacing={2}>
            {projects.map((project) => <ProjectCard key={project.id} {...project} onClick={() => navigate(`/project/${project.id}`)}/>)}
            {!projects.length && (
                <Alert variant="outlined" severity="warning">
                    Нет ни одного активного проекта в ваших пространствах, - своетую подписаться на <Link onClick={() => navigate('/map')}>пространство</Link>
                </Alert>
            )}
            <Alert variant="outlined" severity="success">
                Список релевантных проектов: новые проекты, проекты поблизости, проекты по схожим тегам, проекты по схожим пространствам
            </Alert>
            <QZoom>
                <Fab variant="extended" color="primary" aria-label="add" className={classes.margin} onClick={() => navigate(`/project`)}>
                    <AddIcon className={classes.extendedIcon} />
                </Fab>
            </QZoom>
        </Stack>
    );
}

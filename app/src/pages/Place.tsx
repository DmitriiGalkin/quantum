import * as React from 'react';
import Typography from '@mui/material/Typography';
import {usePlace} from "../modules/place";
import {AppBar, Box, Container, IconButton, Stack, Toolbar} from "@mui/material";
import ProjectCard from "../components/ProjectCard";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import {useNavigate, useParams} from "react-router-dom";

export default function PlaceDialog() {
    const { id: placeId } = useParams();
    const navigate = useNavigate();

    const { data: place } = usePlace(Number(placeId))
    // const userProjectsIds = projects.map((p) => p.id)
    if (!place) return null;

    return (
        <>
            <AppBar position="sticky">
                <Toolbar variant="dense">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => window.history.length ? window.history.back() : navigate('/')}
                    >
                        <ArrowBackIos style={{ color: 'white' }}/>
                    </IconButton>
                    <Typography variant="h6" color="white" component="div">
                        {place.title}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                </Toolbar>
            </AppBar>
            <Container disableGutters sx={{ padding: '24px 18px' }}>
                <Stack spacing={2}>
                    <Typography>
                        {place.description}
                    </Typography>
                    <Stack spacing={2}>
                        {place.projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                // active={userProjectsIds.includes(project.id)}
                                onClick={() => navigate(`/project/${project.id}`)}
                            />
                        ))}
                    </Stack>
                </Stack>
            </Container>
        </>
    );
}

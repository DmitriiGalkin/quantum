import React from 'react';
import ProjectCard from "../components/cards/ProjectCard";
import {Box, Stack, Typography} from "@mui/material";
import {useOnlyUserProjects, useRecommendationProjects} from "../modules/user";
import {useNavigate} from "react-router-dom";

export default function ProjectsPage() {
    const { data: projects = [] } = useOnlyUserProjects()
    const { data: recommendationProjects = [] } = useRecommendationProjects()
    const navigate = useNavigate();

    return (
        <>
            {(Boolean(projects.length) || Boolean(recommendationProjects.length)) ? (
                <Stack spacing={2}>
                    <Stack spacing={2}>
                        {projects.map((project) => <ProjectCard key={project.id} project={project} onClick={() => navigate(`/project/${project.id}`)}/>)}
                    </Stack>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Рекомендуем проекты
                    </Typography>
                    <Stack spacing={2}>
                        {recommendationProjects.map((project) => <ProjectCard key={project.id} project={project} onClick={() => navigate(`/project/${project.id}`)}/>)}
                    </Stack>
                </Stack>
            ) : (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
            >
                <span>Список проектов пуст</span>
            </Box>
            )}
        </>
    );
}

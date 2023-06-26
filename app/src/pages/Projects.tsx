import React from 'react';
import ProjectCard from "../components/cards/ProjectCard";
import {Box, Stack} from "@mui/material";
import {useOnlyUserProjects, useRecommendationProjects} from "../modules/user";
import {useNavigate} from "react-router-dom";
import NewProjectCard from "../components/fields/NewProjectCard";

export default function ProjectsPage() {
    const { data: projects = [], refetch } = useOnlyUserProjects()
    const { data: recommendationProjects = [] } = useRecommendationProjects()
    const navigate = useNavigate();

    return (
        <>
            {(Boolean(projects.length) || Boolean(recommendationProjects.length)) ? (
                <Stack spacing={2}>
                    {projects.map((project) => <ProjectCard key={project.id} project={project} onClick={() => navigate(`/project/${project.id}`)}/>)}
                    {/*<div style={{ width: 67, height: 67 }}>*/}
                    {/*    <NewProjectCard refetch={refetch} />*/}
                    {/*</div>*/}
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

import React from 'react';
import ProjectCard from "../components/ProjectCard";
import {Box, Stack} from "@mui/material";
import {useOnlyUserProjects} from "../modules/user";
import {useNavigate} from "react-router-dom";

export default function ProjectsPage() {
    const { data: projects = [] } = useOnlyUserProjects()
    const navigate = useNavigate();

    return (
        <>
            {Boolean(projects.length) ? (
                <Stack spacing={2}>
                    {projects.map((project) => <ProjectCard key={project.id} project={project} active={true} onClick={() => navigate(`/project/${project.id}`)}/>)}
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
//. Попробуйте найти интересные проекты на <Link onClick={() => setOpenMap(true)}>карте</Link>.
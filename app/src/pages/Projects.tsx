import React from 'react';
import ProjectCard from "../components/ProjectCard";
import {Box, Link, Stack} from "@mui/material";
import {useOnlyUserProjects} from "../modules/user";

export default function ProjectsPage() {
    const { data: projects = [] } = useOnlyUserProjects()

    return (
        <>
            {Boolean(projects.length) ? (
                <Stack spacing={2}>
                    {projects.map((project) => <ProjectCard key={project.id} project={project} active={true} onClick={() => {
                        setProjectId(project.id)
                        setOpenProject(true)
                    }}/>)}
                </Stack>
            ) : (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="80vh"
                >
                    <span>Список проектов пуст. Попробуйте найти интересные проекты на <Link onClick={() => setOpenMap(true)}>карте</Link>.</span>
                </Box>
            )}
        </>
    );
}
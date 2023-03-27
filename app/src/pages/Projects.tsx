import React from 'react';
import ProjectCard from "../components/ProjectCard";
import {Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useOnlyUserProjects} from "../modules/user";

export default function ProjectsPage() {
    const navigate = useNavigate();
    const { data: projects = [] } = useOnlyUserProjects()

    return (
        <Stack spacing={2}>
            {projects.map((project) => <ProjectCard key={project.id} {...project} onClick={() => navigate(`/project/${project.id}`)}/>)}
        </Stack>
    );
}

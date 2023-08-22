import React from 'react';
import {useProjects} from "../tools/service";
import {Stack} from "@mui/material";
import {DialogHeader, ProjectCard} from "../components";

export interface ProjectsProps {
    onClose: () => void
}
export default function Projects({ onClose }: ProjectsProps) {
    const { data: projects, refetch } = useProjects();

    return (
        <>
            <DialogHeader title="Проекты" onClick={onClose}/>
            <Stack spacing={2} style={{ backgroundColor: '#F5F5F5', padding: '15px' }}>
                {projects?.map((project) =>
                    <div key={project.id}>
                        <ProjectCard project={project} refetch={refetch} />
                    </div>
                )}
            </Stack>
        </>
    );
}
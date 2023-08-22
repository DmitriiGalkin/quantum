import React from 'react';
import {useProjects} from "../tools/service";
import {Stack} from "@mui/material";
import {DialogHeader, ProjectCard} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";

export interface ProjectsProps {
    onClose: () => void
}
function Projects({ onClose }: ProjectsProps) {
    const { data: projects, refetch } = useProjects();

    return (
        <>
            <DialogHeader title="Проекты" onClick={onClose}/>
            <DialogContent>
                <Stack spacing={2}>
                    {projects?.map((project) =>
                        <div key={project.id}>
                            <ProjectCard project={project} refetch={refetch} />
                        </div>
                    )}
                </Stack>
            </DialogContent>
        </>
    );
}

export default withDialog(Projects)

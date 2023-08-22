import React from 'react';
import {useProjects} from "../tools/service";
import {Stack} from "@mui/material";
import {DialogHeader, ProjectCard, TransitionDialog} from "../components";
import Dialog from "@mui/material/Dialog";
import {DialogContent} from "../components/DialogContent";

export interface ProjectsProps {
    open: boolean
    onClose: () => void
}
export default function Projects({ open, onClose }: ProjectsProps) {
    const { data: projects, refetch } = useProjects();

    return (
        <Dialog onClose={onClose} open={open} fullScreen TransitionComponent={TransitionDialog}>
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
        </Dialog>
    );
}
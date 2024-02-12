import React from 'react';
import {useProjects} from "../tools/service";
import {DialogHeader, ProjectCard} from "../components";
import {withDialog} from "../components/helper";
import {Project} from "../tools/dto";
import Masonry from "@mui/lab/Masonry";
import {Stack} from "@mui/material";

export interface SelectProjectProps {
    onClose: () => void
    onChange: (project: Project) => void
}
function SelectProject({ onClose, onChange }: SelectProjectProps) {
    const { data: projects = [], refetch } = useProjects();

    return (
        <>
            <DialogHeader title="Выберите свой проект" onClick={onClose} />
            <div style={{ flex: '1 1 auto', overflowY: 'auto', padding: '8px 2px 8px 8px' }}>
                <Stack spacing={1}>
                    {projects.map((project,index) =>
                        <ProjectCard key={project.id} project={project} onClick={onChange} variant="admin" />
                    )}
                </Stack>
            </div>
        </>
    );
}
export default withDialog(SelectProject)

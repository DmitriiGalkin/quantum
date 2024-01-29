import React from 'react';
import {useProjects} from "../tools/service";
import {DialogHeader, ProjectCard} from "../components";
import {withDialog} from "../components/helper";
import {Project} from "../tools/dto";
import Masonry from "@mui/lab/Masonry";

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
                <Masonry columns={2} spacing={1}>
                    {projects.map((project,index) =>
                        <ProjectCard key={project.id} project={project} onClick={onChange} />
                    )}
                </Masonry>
            </div>
        </>
    );
}
export default withDialog(SelectProject)

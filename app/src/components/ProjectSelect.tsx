import React from 'react';
import {ImageSelect} from "./ImageSelect";
import {Place, Project} from "../tools/dto";
import Places from "../dialogs/Places";
import {useToggle} from "usehooks-ts";
import {usePlaces, useProjects} from "../tools/service";

interface ProjectSelectProps {
    onChange: (project: Project) => void
    projectId?: number
}

export function ProjectSelectDefault({ onChange, projectId }: ProjectSelectProps) {
    const { data: projects = [] } = useProjects()
    const selected = projects.find(p => p.id === projectId)

    return (
        <>
            <ImageSelect<Project>
                label="Проект"
                selected={selected}
                items={projects}
                onChange={onChange}
            />
        </>
    );
}

export const ProjectSelect = React.memo(ProjectSelectDefault);


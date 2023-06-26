import React, {useState} from 'react';
import {Project} from "../../modules/project";
import ProjectFieldCard from "./ProjectFieldCard";
import Grid from "@mui/material/Unstable_Grid2";
import {Stack} from "@mui/material";
import NewFieldCard from "./NewFieldCard";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "../TransitionDialog";
import CreateProject from "../../dialogs/CreateProject";
import NewProjectCard from "./NewProjectCard";

interface ProjectFieldProps {
    label: string
    selectedProjectId?: number
    projects: Project[]
    onChange: (project: Project) => void
    refetch: () => void
}
export function ProjectField({ label, selectedProjectId, projects, onChange, refetch }: ProjectFieldProps) {

    return (
        <Stack spacing={2} direction="column">
            <div style={{ fontWeight: 900, fontSize: 18, color: '#070707' }}>
                {label}
            </div>
            <Grid container spacing={2}>
                <Grid xs={3}>
                    <NewProjectCard refetch={refetch} />
                </Grid>
                {projects.map((project) => (
                    <Grid xs={3} key={project.id}>
                        <ProjectFieldCard active project={project} selected={selectedProjectId === project.id} onClick={() => {
                            onChange(project)
                        }}/>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}

export default ProjectField;

import React from 'react';
import {useNavigate} from "react-router-dom";
import {TextFieldProps} from "@mui/material/TextField/TextField";
import ProjectCard from "../cards/ProjectCard";
import {getProjectDefaultDatetime} from "../../dialogs/CreateMeet";
import {Place} from "../../modules/place";
import {Project} from "../../modules/project";
import ProjectFieldCard from "./ProjectFieldCard";
import Grid from "@mui/material/Unstable_Grid2";

interface ProjectFieldProps {
    label: string
    selectedProjectId?: number
    projects: Project[]
    onChange: (project: Project) => void
}
export function ProjectField({ label, selectedProjectId, projects, onChange }: ProjectFieldProps) {
    return (
        <>
            <div style={{ fontWeight: 900, fontSize: 18, color: '#070707' }}>
                {label}
            </div>
            <Grid container spacing={1}>
                {projects.map((project) => (
                    <Grid xs={3} key={project.id}>
                        <ProjectFieldCard active project={project} selected={selectedProjectId === project.id} onClick={() => {
                            onChange(project)
                        }}/>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default ProjectField;

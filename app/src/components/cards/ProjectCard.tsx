import React from 'react';

import {CardContent, Typography} from "@mui/material";
import {Project} from "../../modules/project";
import QCard from "../QCard";
import Grid from '@mui/material/Unstable_Grid2';
import Image from "../Image";

interface ProjectCardProps {
    project: Project
    active?: boolean
    selected?: boolean
    onClick?: () => void
}

export default function ProjectCard({ project, selected, onClick }: ProjectCardProps) {
    return (
        <QCard onClick={onClick} active={project.active} selected={selected}>
            <div style={{ flexGrow: 1 }}>
                <Grid container direction="row">
                    {project.image && (
                        <Grid xs={3}>
                            <Image src={project.image} paddingTop="150%"/>
                        </Grid>
                    )}
                    <Grid xs={9}>
                        <CardContent>
                            <Typography variant="h5">
                                {project.title}
                            </Typography>
                            <Typography style={{ overflow: 'hidden', height: 60 }}>
                                {project.description}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </div>
        </QCard>
    );
}

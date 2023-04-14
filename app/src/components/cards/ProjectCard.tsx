import React from 'react';

import {Box, CardContent, CardMedia, Stack, Typography} from "@mui/material";
import {Project} from "../../modules/project";
import QCard from "../QCard";
import Grid from '@mui/material/Unstable_Grid2';

interface ProjectCardProps {
    project: Project
    active?: boolean
    selected?: boolean
    onClick?: () => void
}


export default function ProjectCard({ project, selected, onClick }: ProjectCardProps) {
    // const firstMeetDateTitle = convertToMeetDatetime(project.meet?.datetime) E1F1FA CDEBFC
    return (
        <QCard onClick={onClick} active={project.active} selected={selected}>
            {project.image && (
                <CardMedia
                    component="img"
                    sx={{ width: '33%' }}
                    style={{ objectFit: 'cover'}}
                    image={project.image}
                    alt={project.title}
                />
            )}
            <CardContent>
                <Typography variant="h5">
                    {project.title}
                </Typography>
                <div style={{ display: 'flex' }}>
                    <Box>
                        {/*<Typography variant="subtitle1" color="primary">*/}
                        {/*    {firstMeetDateTitle}*/}
                        {/*</Typography>*/}
                        <Typography>
                            {project.description}
                        </Typography>
                    </Box>
                </div>
            </CardContent>
        </QCard>
    );
}
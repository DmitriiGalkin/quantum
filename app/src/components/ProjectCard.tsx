import React from 'react';

import {Box, Card, CardContent, Typography} from "@mui/material";
import {convertToMeetDatetime} from "../tools/date";
import {Project} from "../modules/project";

interface ProjectCardProps {
    project: Project
    selected?: boolean
    onClick: () => void
}
export default function ProjectCard({ project, selected, onClick }: ProjectCardProps) {
    const firstMeetDateTitle = convertToMeetDatetime(project.meet?.datetime)
    return (
        <Card onClick={onClick} style={{ backgroundColor: project.active || selected ? 'rgba(255,204,0,0.1)' : undefined }}>
            <CardContent>
                <Typography variant="h5">
                    {project.title}
                </Typography>
                <div style={{ display: 'flex' }}>
                    <Box>
                        <Typography variant="subtitle1" color="primary">
                            {firstMeetDateTitle}
                        </Typography>
                        <Typography>
                            {project.description}
                        </Typography>
                    </Box>
                </div>
            </CardContent>
        </Card>

    );
}
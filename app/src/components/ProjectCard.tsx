import React from 'react';

import {Box, Card, CardContent, Typography} from "@mui/material";
import {convertToMeetDatetime} from "../tools/date";
import {Project} from "../modules/project";

interface ProjectCardProps {
    project: Project
    active?: boolean
    selected?: boolean
    onClick?: () => void
}
export default function ProjectCard({ project, active, selected, onClick }: ProjectCardProps) {
    // const firstMeetDateTitle = convertToMeetDatetime(project.meet?.datetime)
    const backgroundColor = selected ? 'rgba(255,204,0,0.6)' : ( active ? 'rgba(255,204,0,0.4)' : undefined)
    return (
        <Card onClick={onClick} style={{ backgroundColor }}>
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
        </Card>

    );
}
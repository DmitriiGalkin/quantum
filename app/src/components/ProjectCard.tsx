import React from 'react';

import {Box, Card, CardContent, Typography} from "@mui/material";
import {Project} from "../modules/project";
import {DEFAULT_COLOR, SELECTED_COLOR} from "./MeetCard";

interface ProjectCardProps {
    project: Project
    active?: boolean
    selected?: boolean
    onClick?: () => void
}
export default function ProjectCard({ project, active, selected, onClick }: ProjectCardProps) {
    // const firstMeetDateTitle = convertToMeetDatetime(project.meet?.datetime) E1F1FA CDEBFC
    const backgroundColor = selected ? SELECTED_COLOR : ( active ? DEFAULT_COLOR : undefined)
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
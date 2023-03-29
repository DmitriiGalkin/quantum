import React from 'react';

import {Box, Typography} from "@mui/material";
import {convertToMeetDatetime} from "../tools/date";
import {Project} from "../modules/project";

interface ProjectCardProps extends Project {
    selected?: boolean
    onClick: () => void
}
export default function ProjectCard(project: ProjectCardProps) {
    const firstMeetDateTitle = convertToMeetDatetime(project.meet?.datetime)
    return (
    <Box sx={{ flexDirection: 'column', border: '1px solid #E1E3E8',
            borderRadius: 2,
            padding: 2,
            '& > * + *': {
                paddingTop: 2,
            },
            marginBottom: 2,
            backgroundColor: project.active || project.selected ? 'rgba(255,204,0,0.1)' : undefined
        }}
         onClick={project.onClick}
    >
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
    </Box>
    );
}
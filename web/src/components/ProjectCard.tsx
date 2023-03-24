import React from 'react';
import Image from "./Image";

import {Box, Typography} from "@mui/material";
import {convertToMeetDatetime} from "../tools/date";
import {Project} from "../modules/project";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {useUnit} from "../tools/hooks";

interface ProjectCardProps extends Project {
    selected?: boolean
    onClick: () => void
}
export default function ProjectCard(project: ProjectCardProps) {
    const unit = useUnit()
    const active = project.users?.find((user) => user.id === unit.id)

    const firstMeetDateTitle = convertToMeetDatetime(project.meet?.datetime)
    return (
    <Box sx={{ flexDirection: 'column', border: '1px solid #E1E3E8',
            borderRadius: 2,
            padding: 2,
            '& > * + *': {
                paddingTop: 2,
            },
            marginBottom: 2,
            backgroundColor: active || project.selected ? 'rgba(255,204,0,0.1)' : undefined
        }}
         onClick={project.onClick}
    >
        <Typography variant="h5">
            {project.title}
        </Typography>
        <div style={{ display: 'flex' }}>
            <Box sx={{display: 'block',
                minWidth: '75px'}}>
                <Image
                    src={project.image}
                    alt={project.title}
                    borderRadius={'12'}
                />
            </Box>
            <Box sx={{ paddingLeft: 2 }}>
                <Typography variant="subtitle1" color="primary">
                    {firstMeetDateTitle}
                </Typography>
                <Typography>
                    {project.description}
                </Typography>
                <Typography>
                    <LocationOnIcon/>
                    {project.place?.title}
                </Typography>
            </Box>
        </div>
    </Box>
    );
}
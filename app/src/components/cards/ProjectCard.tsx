import React from 'react';

import {Box, Typography} from "@mui/material";
import {Project} from "../../modules/project";
import QCard from "../QCard";

interface ProjectCardProps {
    project: Project
    active?: boolean
    selected?: boolean
    onClick?: () => void
}
export default function ProjectCard({ project, active, selected, onClick }: ProjectCardProps) {
    // const firstMeetDateTitle = convertToMeetDatetime(project.meet?.datetime) E1F1FA CDEBFC
    return (
        <QCard onClick={onClick} active={active} selected={selected}>
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
        </QCard>
    );
}
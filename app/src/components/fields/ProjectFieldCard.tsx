import React from 'react';

import {CardContent, Typography} from "@mui/material";
import {Project} from "../../modules/project";
import QCard from "../QCard";
import Grid from '@mui/material/Unstable_Grid2';
import Image from "../Image";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(() => ({
    blockInner: {
        width: '100%',
        paddingTop: '100%',
        position: 'relative',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 25,
    },
}));

interface ProjectFieldCardProps {
    project: Project
    active?: boolean
    selected?: boolean
    onClick: (project: Project) => void
}

export default function ProjectFieldCard({ project, selected, onClick }: ProjectFieldCardProps) {
    const classes = useStyles();

    return (
        <div onClick={() => onClick(project)}>
            <div className={classes.blockInner}>
                <img src={project.image} className={classes.image} style={{ outline: `4px solid ${selected ? '#7139FF' : 'transparent' }`}} />
            </div>
            <div style={{ paddingTop: 11, fontSize: 13, textOverflow: 'ellipsis', overflow: 'hidden', textAlign: 'center' }}>{project.title}</div>
        </div>
    );
}

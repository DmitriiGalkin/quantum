import React from 'react';

import {Avatar, Box, CardContent, Stack, Typography} from "@mui/material";
import {Project} from "../../modules/project";
import QCard from "../QCard";
import Grid from '@mui/material/Unstable_Grid2';
import Image from "../Image";
import {makeStyles} from "@mui/styles";
import {DEFAULT_COLOR} from "../../tools/theme";
import {useNavigate} from "react-router-dom";

interface ProjectCardProps {
    project: Project
    active?: boolean
    selected?: boolean
    onClick?: () => void
}
const useStyles = makeStyles(() => ({
    blockInner: {
        width: '100%',
        paddingTop: '200%',
        position: 'relative',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 9.5,
    },
}));
export default function ProjectCard({ project, selected, onClick }: ProjectCardProps) {
    const classes = useStyles();
    const navigate = useNavigate();
    const src = Boolean(project.users?.length) ? project.users[0].image : undefined

    return (
        <div style={{ padding: 11, backgroundColor: DEFAULT_COLOR, borderRadius: 16 }} onClick={() => navigate(`/project/${project.id}`)}>
            <Stack spacing={2} direction="row">
                <div style={{ flexGrow: 1 }}>
                    <Box style={{ display: 'flex', height: '96%' }} flexDirection="column" justifyContent="space-between">
                        <div>
                            <div style={{ textOverflow: 'ellipsis', width: '100%', whiteSpace: 'nowrap', fontSize: 15, overflow: 'hidden', color: '#3F3F3F', fontWeight: 500 }}>
                                {project.title}
                            </div>
                            <div style={{ textOverflow: 'ellipsis', width: '100%', fontSize: 12, overflow: 'hidden', color: '#3F3F3F' }}>
                                {project.description}
                            </div>
                        </div>
                        <Stack spacing={2} direction="row" alignItems="center">
                            <Avatar alt="Дмитрий Галкин" src={src} sx={{ width: 21, height: 21 }} />
                            <span style={{ fontSize: 13 }}>Дмитрий Галкин</span>
                        </Stack>
                    </Box>
                </div>
                <div style={{ width: 70, minWidth: 70 }}>
                    <div className={classes.blockInner}>
                        <img src={project.image} className={classes.image}/>
                    </div>
                </div>
            </Stack>
        </div>
    );
}

import React from 'react';
import {Project} from "../tools/dto";
import {Box, Chip, Stack} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {DEFAULT_COLOR} from "../tools/theme";
import {useNavigate} from "react-router-dom";
import {getAgeLabel} from "../tools/helper";

interface ProjectCardProps {
    project: Project
    selected?: boolean
    refetch?: () => void
}
const useStyles = makeStyles(() => ({
    blockInner: {
        width: '100%',
        paddingTop: '116%',
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
export function ProjectCard({ project, refetch }: ProjectCardProps) {
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <div style={{ backgroundColor: DEFAULT_COLOR, borderRadius: 16 }} onClick={() => navigate(`/project/${project.id}`)}>
            <Stack spacing={1} direction="column">
                {project.image && (
                    <div style={{ minWidth: 150, position: "relative" }}>
                        <div className={classes.blockInner}>
                            <img alt={project.title} src={project.image} className={classes.image}/>
                        </div>
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 10, background: 'rgba(0,0,0,.5)', borderRadius: '0px 0px 16px 16px' }}>
                            <Box style={{ display: 'flex', height: '96%' }} flexDirection="column" justifyContent="space-between">
                                <div style={{ textOverflow: 'ellipsis', width: '100%', fontSize: 15, overflow: 'hidden', color: 'white', fontWeight: 500 }}>
                                    {project.title}
                                </div>
                            </Box>
                        </div>
                        <Chip label={getAgeLabel(project)} size="small" style={{position: "absolute", top: 5, left: 5, backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#e3e3e3' }}/>
                    </div>
                )}
            </Stack>
        </div>
    );
}

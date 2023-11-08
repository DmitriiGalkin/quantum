import React from 'react';
import {Project} from "../tools/dto";
import {Box, Stack} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {DEFAULT_COLOR} from "../tools/theme";
import {useNavigate} from "react-router-dom";
import {getAgeTitle2} from "../tools/helper";

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
        <div style={{ padding: 11, backgroundColor: DEFAULT_COLOR, borderRadius: 16 }} onClick={() => navigate(`/project/${project.id}`)}>
            <Stack spacing={2} direction="row">
                {project.image && (
                    <div style={{ width: 90, minWidth: 90 }}>
                        <div className={classes.blockInner}>
                            <img alt={project.title} src={project.image} className={classes.image}/>
                        </div>
                    </div>
                )}
                <div style={{ flexGrow: 1 }}>
                    <Box style={{ display: 'flex', height: '96%' }} flexDirection="column" justifyContent="space-between">
                        <div style={{ textOverflow: 'ellipsis', width: '100%', fontSize: 15, overflow: 'hidden', color: '#3F3F3F', fontWeight: 500 }}>
                            {project.title} {getAgeTitle2(project.ageFrom, project.ageTo)}
                        </div>
                        <div style={{ textOverflow: 'ellipsis', width: '100%', fontSize: 12, overflow: 'hidden', color: '#3F3F3F', fontWeight: 500 }}>
                            {project.description}
                        </div>
                    </Box>
                </div>
            </Stack>
        </div>
    );
}

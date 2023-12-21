import React from 'react';
import {Project} from "../tools/dto";
import {Chip, Stack} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {useNavigate} from "react-router-dom";
import {getAgeLabel} from "../tools/helper";
import Typography from "../components/Typography";

interface ProjectCardProps {
    project: Project
    selected?: boolean
}
const useStyles = makeStyles(() => ({
    image: {
        width: '100%',
        borderRadius: 9.5,
        display: 'block',
    },
}));
export function ProjectCard({ project }: ProjectCardProps) {
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/project/${project.id}`)}>
            <Stack spacing={1}>
                <div style={{ minWidth: 150, position: "relative" }}>
                    {project.image && (
                        <>
                            <Chip label={getAgeLabel(project)} size="small" style={{position: "absolute", top: 5, left: 5, backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#e3e3e3' }}/>
                            <img alt={project.title} src={project.image} className={classes.image}/>
                        </>
                        )}
                    <div style={{ padding: 4 }}>
                        <Typography variant="Body-Bold">{project.title}</Typography>
                    </div>
                </div>
            </Stack>
        </div>
    );
}

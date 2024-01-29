import React from 'react';
import {Project} from "../tools/dto";
import {Chip, Stack} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {getAgeLabel} from "../tools/helper";
import Typography from "../components/Typography";
import ProjectPage from "../dialogs/ProjectView";
import {useToggle} from "usehooks-ts";

interface ProjectCardProps {
    project: Project
    // selected?: boolean
    onClick?: (project: Project) => void
}
const useStyles = makeStyles(() => ({
    image: {
        width: '100%',
        borderRadius: 9.5,
        display: 'block',
    },
}));
export function ProjectCard({ project, onClick }: ProjectCardProps) {
    const classes = useStyles();
    const [open, toggleOpen] = useToggle()

    return (
        <>
            <div onClick={onClick ? () => onClick && onClick(project) : toggleOpen}>
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
            <ProjectPage projectId={project.id} open={open} onClose={toggleOpen} />
        </>

    );
}

import React from 'react';
import {Project} from "../tools/dto";
import {Chip, Stack} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {getAgeLabel} from "../tools/helper";
import Typography from "../components/Typography";
import ProjectDialog from "../dialogs/Project";
import {useToggle} from "usehooks-ts";
import {COLOR_DEFAULT} from "../tools/theme";

interface ProjectCardProps {
    project: Project
    // selected?: boolean
    onClick?: (project: Project) => void
    refetchParent?: () => void // функция которую необходимо дернуть в случае изменений/удаления
}
const useStyles = makeStyles(() => ({
    image: {
        width: '100%',
        borderRadius: 9.5,
        display: 'block',
    },
}));
export function ProjectCard({ project, onClick, refetchParent }: ProjectCardProps) {
    const classes = useStyles();
    const [open, toggleOpen] = useToggle()

    return (
        <>
            <div onClick={onClick ? () => onClick && onClick(project) : toggleOpen}>
                <Stack spacing={1} style={{ opacity: project.deleted ? 0.5 : 1}}>
                    <div style={{ minWidth: 150, position: "relative" }}>
                        {project.image && (
                            <>
                                <Chip label={getAgeLabel(project)} size="small" style={{position: "absolute", top: 5, left: 5, backgroundColor: 'rgba(0, 0, 0, 0.6)', color: COLOR_DEFAULT }}/>
                                <img alt={project.title} src={project.image} className={classes.image}/>
                            </>
                        )}
                        <div style={{ padding: 4 }}>
                            <Typography variant="Body-Bold">{project.title}</Typography>
                        </div>
                    </div>
                </Stack>
            </div>
            <ProjectDialog projectId={project.id} open={open} onClose={() => { toggleOpen(); refetchParent && refetchParent() }} />
        </>

    );
}

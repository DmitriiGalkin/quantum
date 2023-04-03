import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import {Place, usePlace} from "../modules/place";
import {Container, Stack} from "@mui/material";
import ForwardAppBar from "../components/ForwardAppBar";
import ProjectCard from "../components/ProjectCard";
import {Project} from "../modules/project";
import {TransitionDialog} from "../components/TransitionDialog";

export interface PlaceDialogProps {
    projects: Project[]
    openPlace: boolean
    setOpenProject: (isOpen: boolean) => void
    placeId?: number
    setProject: (project: Project) => void
    onClose: () => void
}

export function PlaceDialog({ openPlace, projects, placeId, setProject, setOpenProject, onClose }: PlaceDialogProps) {
    const { data: place } = usePlace(placeId)
    const userProjectsIds = projects.map((p) => p.id)
    if (!place) return null;

    return (
        <Dialog onClose={onClose} open={openPlace} fullScreen keepMounted TransitionComponent={TransitionDialog}>
            <ForwardAppBar title={place.title} onClick={onClose}/>
            <Container disableGutters sx={{ padding: '24px 18px' }}>
                <Stack spacing={2}>
                    <Typography>
                        {place.description}
                    </Typography>
                    <Stack spacing={2}>
                        {place.projects.map((project) => <ProjectCard key={project.id} project={project} active={userProjectsIds.includes(project.id)} onClick={() => {
                            setProject(project)
                            setOpenProject(true)
                        }}/>)}
                    </Stack>
                </Stack>
            </Container>
        </Dialog>
    );
}

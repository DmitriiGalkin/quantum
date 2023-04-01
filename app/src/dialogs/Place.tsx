import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import {usePlace} from "../modules/place";
import {Container, Stack} from "@mui/material";
import ForwardAppBar from "../components/ForwardAppBar";
import ProjectCard from "../components/ProjectCard";

export interface PlaceDialogProps {
    placeId: number;
    setProjectId: (projectId: number) => void
    onClose: () => void;
}

export function PlaceDialog({ placeId, setProjectId, onClose }: PlaceDialogProps) {
    const { data: place } = usePlace(placeId)
    if (!place) return null;

    return (
        <Dialog onClose={onClose} open={true} fullScreen>
            <ForwardAppBar title={place.title} onClick={onClose}/>
            <Container disableGutters sx={{ padding: '24px 18px' }}>
                <Stack spacing={2}>
                    <Typography>
                        {place.description}
                    </Typography>
                    <Stack spacing={2}>
                        {place.projects.map((project) => <ProjectCard key={project.id} project={project} onClick={() => setProjectId(project.id)}/>)}
                    </Stack>
                </Stack>
            </Container>
        </Dialog>
    );
}

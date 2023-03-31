import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import {Place, useAddPlaceUser, useDeletePlaceUser, usePlace} from "../modules/place";
import {Box, Card, Container, Stack, Theme} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {makeStyles} from "@mui/styles";
import ForwardAppBar from "../components/ForwardAppBar";
import ProjectCard from "../components/ProjectCard";

const useStyles = makeStyles((theme: Theme) => ({
    block: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 12,
        padding: 12,
    },

}));

export interface PlaceDialogProps {
    placeId: number;
    setProjectId: (projectId: number) => void
    onClose: () => void;
}

export function PlaceDialog({ placeId, setProjectId, onClose }: PlaceDialogProps) {
    const classes = useStyles();
    const { data: place } = usePlace(placeId)

    const addPlaceUser = useAddPlaceUser(placeId)
    const deletePlaceUser = useDeletePlaceUser(placeId)

    if (!place) return null;
    const onClick = () => {
        if (place.active) {
            deletePlaceUser.mutate({ placeId })
        } else {
            addPlaceUser.mutate({ placeId })
        }
    }

    return (
        <Dialog onClose={onClose} open={true} fullScreen>
            <ForwardAppBar title={place.title} onClick={onClose}/>
            <Container disableGutters sx={{ padding: '24px 18px' }}>
                <Stack spacing={2}>
                    <Typography>
                        {place.description}
                    </Typography>
                    <Card variant="outlined">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon />}
                            onClick={onClick}
                        >
                            {place.active ? 'Не следить за его проектами' : 'Следить за проектами '}
                        </Button>
                    </Card>
                    <Stack spacing={2}>
                        {place.projects.map((project) => <ProjectCard key={project.id} project={project} onClick={() => setProjectId(project.id)}/>)}
                    </Stack>
                </Stack>
            </Container>
        </Dialog>
    );
}

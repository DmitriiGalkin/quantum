import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import {Place, useAddPlaceUser, useDeletePlaceUser, usePlace} from "../modules/place";
import {Box, Theme} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {makeStyles} from "@mui/styles";
import ForwardAppBar from "../components/ForwardAppBar";

const useStyles = makeStyles((theme: Theme) => ({
    block: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 12,
        padding: 12,
    },

}));

export interface PlaceDialogProps {
    placeId: number;
    onClose: () => void;
}

export function PlaceDialog({ placeId, onClose }: PlaceDialogProps) {
    const classes = useStyles();
    const { data: place = {} as Place } = usePlace(placeId)

    const addPlaceUser = useAddPlaceUser(placeId)
    const deletePlaceUser = useDeletePlaceUser(placeId)
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
            <Typography>
                {place.description}
            </Typography>
            <Box className={classes.block}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon />}
                    onClick={onClick}
                >
                    {place.active ? 'Не следить за его проектами' : 'Следить за проектами '}
                </Button>
            </Box>
        </Dialog>
    );
}

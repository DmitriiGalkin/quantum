import React from 'react';
import {makeStyles} from '@mui/styles';
import ForwardAppBar from "../components/ForwardAppBar";
import {useParams} from "react-router-dom";
import {Place, useAddPlaceUser, useDeletePlaceUser, usePlace} from "../modules/place";
import {Box, Button, Container, Theme, Typography} from "@mui/material";
import Image from "../components/Image";
import SaveIcon from "@mui/icons-material/Save";


const useStyles = makeStyles((theme: Theme) => ({
    container: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: `${theme.spacing(4)}px ${theme.spacing(4)}px 0 0`,
    },
    block: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 12,
        padding: 12,
    },
    large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    root: {
        flexGrow: 1,
    },
    root2: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

export default function PlacePage() {
    const classes = useStyles();
    const id = Number(useParams().id);
    const { data: place = {} as Place } = usePlace(id)

    const addPlaceUser = useAddPlaceUser(id)
    const deletePlaceUser = useDeletePlaceUser(id)
    const onClick = () => {
        if (place.active) {
            deletePlaceUser.mutate({ placeId: id })
        } else {
            addPlaceUser.mutate({ placeId: id })
        }
    }

    return (
        <div className={classes.root}>
            <ForwardAppBar title={place.title}/>
            <div className={classes.container}>
                <Box sx={{ margin: '0 18px', paddingTop: 3}}>
                    <Image alt={place.title} src={place.image} borderRadius={'24px 24px 0 0'} />
                </Box>
                <Container disableGutters sx={{ padding: '24px 18px',
                    '& > * + *': {
                        marginTop: 2,
                    }
                }}>
                    <Typography variant="h5">
                        {place.title}
                    </Typography>
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
                            {place.active ? 'Покинуть пространство' : 'Участвовать в пространстве'}
                        </Button>
                    </Box>
                </Container>
            </div>
        </div>
    );
}
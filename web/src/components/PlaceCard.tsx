import React from 'react';
import {Place} from "../modules/place";
import {Link} from "react-router-dom";
import {Box, CardMedia, CardContent, Typography, CardActionArea, Theme} from "@mui/material";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles((theme: Theme) => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
    },
}));
interface PlaceCardProps extends Place {
    selected?: boolean
}
export default function PlaceCard(place: PlaceCardProps) {
    const classes = useStyles();

    return (
        <Box sx={{
            backgroundColor: place.selected ? 'rgba(255,204,0,0.1)' : undefined
        }}>
            <CardActionArea component={Link} to={`/place/${place.id}`}>
                <CardMedia
                    className={classes.media}
                    image={place.image}
                    title={place.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {place.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {place.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Box>
    );
}
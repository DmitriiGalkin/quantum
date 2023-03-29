import React from 'react';
import {Place} from "../modules/place";
import {Link} from "react-router-dom";
import {Box, CardActionArea, CardContent, Typography} from "@mui/material";

interface PlaceCardProps extends Place {
    selected?: boolean
}
export default function PlaceCard(place: PlaceCardProps) {

    return (
        <Box sx={{
            backgroundColor: place.selected ? 'rgba(255,204,0,0.1)' : undefined
        }}>
            <CardActionArea component={Link} to={`/place/${place.id}`}>
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
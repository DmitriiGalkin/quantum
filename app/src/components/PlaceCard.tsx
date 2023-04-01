import React from 'react';
import {Place} from "../modules/place";
import {Card, CardContent, Typography} from "@mui/material";

interface PlaceCardProps {
    place: Place
    selected?: boolean
    onClick?: (place: Place) => void
}
export default function PlaceCard({ place, selected, onClick }: PlaceCardProps) {

    return (
        <Card onClick={() => onClick && onClick(place)} style={{ backgroundColor: selected ? 'rgba(255,204,0,0.1)' : undefined }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {place.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {place.description}
                </Typography>
            </CardContent>
        </Card>
    );
}
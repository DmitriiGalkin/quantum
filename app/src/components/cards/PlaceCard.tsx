import React from 'react';
import {Place} from "../../modules/place";
import {Typography} from "@mui/material";
import QCard from "../QCard";

interface PlaceCardProps {
    place: Place
    selected?: boolean
    onClick?: (place: Place) => void
}
export default function PlaceCard({ place, selected, onClick }: PlaceCardProps) {

    return (
        <QCard onClick={() => onClick && onClick(place)} selected={selected}>
            <Typography gutterBottom variant="h5" component="h2">
                {place.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {place.description}
            </Typography>
        </QCard>
    );
}
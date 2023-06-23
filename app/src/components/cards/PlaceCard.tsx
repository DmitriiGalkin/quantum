import React from 'react';
import {Place} from "../../modules/place";
import {Typography} from "@mui/material";
import QCard from "../QCard";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(() => ({
    blockInner: {
        width: '100%',
        paddingTop: '100%',
        position: 'relative',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 35,
    },
}));

interface PlaceCardProps {
    place: Place
    selected?: boolean
    onClick: (place: Place) => void
}
export default function PlaceCard({ place, selected, onClick }: PlaceCardProps) {
    const classes = useStyles();

    return (
        <div onClick={() => onClick(place)}>
            <div style={{ width: 80, minWidth: 80 }}>
                <div className={classes.blockInner}>
                    <img src={place.image} className={classes.image} style={{ border: `2px solid ${selected ? '#FF8F28' : 'transparent' }`}}/>
                </div>
            </div>
            <div style={{ paddingTop: 11, fontSize: 13 }}>{place.title}</div>
        </div>
    );
}
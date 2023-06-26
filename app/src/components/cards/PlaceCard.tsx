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
        borderRadius: 25,
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
            <div className={classes.blockInner}>
                <img src={place.image} className={classes.image} style={{ outline: `4px solid ${selected ? '#7139FF' : 'transparent' }`}}/>
            </div>
            <div style={{ paddingTop: 11, fontSize: 13, textOverflow: 'ellipsis', overflow: 'hidden', textAlign: 'center' }}>{place.title}</div>
        </div>
    );
}
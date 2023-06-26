import React from 'react';
import {AppBar, Box, IconButton, Skeleton, Stack, TextField, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {TextFieldProps} from "@mui/material/TextField/TextField";
import ProjectCard from "../cards/ProjectCard";
import {getProjectDefaultDatetime} from "../../dialogs/CreateMeet";
import PlaceCard from "../cards/PlaceCard";
import {Place} from "../../modules/place";
import NewFieldCard from "./NewFieldCard";
import Grid from "@mui/material/Unstable_Grid2";

interface PlaceFieldProps {
    label: string
    selectedPlaceId?: number
    places: Place[]
    onChange: (place: Place) => void
}
export function PlaceField({ label, selectedPlaceId, places, onChange }: PlaceFieldProps) {
    return (
        <Stack spacing={2} direction="column">
            <div style={{ fontWeight: 900, fontSize: 18, color: '#070707' }}>
                {label}
            </div>
            <Grid container spacing={2}>
                <Grid xs={3}>
                    <NewFieldCard onClick={() => console.log('1')} label="Новое"/>
                </Grid>
                {places.map((place) => (
                    <Grid xs={3} key={place.id}>
                        <PlaceCard key={place.id} place={place} selected={selectedPlaceId === place.id} onClick={() => {onChange(place)}}/>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}

export default PlaceField;

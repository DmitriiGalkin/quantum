import React from 'react';
import {AppBar, Box, IconButton, Skeleton, Stack, TextField, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {TextFieldProps} from "@mui/material/TextField/TextField";
import ProjectCard from "../cards/ProjectCard";
import {getProjectDefaultDatetime} from "../../dialogs/CreateMeet";
import PlaceCard from "../cards/PlaceCard";
import {Place} from "../../modules/place";

interface PlaceFieldProps {
    label: string
    selectedPlaceId?: number
    places: Place[]
    onChange: (place: Place) => void
}
export function PlaceField({ label, selectedPlaceId, places, onChange }: PlaceFieldProps) {
    return (
        <>
            <div style={{ fontWeight: 900, fontSize: 18, color: '#070707' }}>
                {label}
            </div>
            <Stack spacing={2} direction="row">
                {places.map((place) => <PlaceCard key={place.id} place={place} selected={selectedPlaceId === place.id} onClick={() => {
                    onChange(place)
                }}/>)}
            </Stack>
        </>
    );
}

export default PlaceField;

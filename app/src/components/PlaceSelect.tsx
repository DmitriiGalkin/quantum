import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {makeStyles} from "@mui/styles";
import {ImageSelect} from "./ImageSelect";
import {Place} from "../tools/dto";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "./TransitionDialog";
import Places from "../view/Places";
import {Stack} from "@mui/material";
import {useToggle} from "usehooks-ts";
import {usePlaces} from "../tools/service";

interface PlaceSelectProps {
    onChange: (place: { latitude: string, longitude: string }) => void
    latitude: string
    longitude: string
}

export function PlaceSelect({ onChange, latitude, longitude }: PlaceSelectProps) {
    const [findPlace, toggleFindPlace] = useToggle()
    const { data: places = [] } = usePlaces()
    const selected = places.find(p => p.latitude === String(latitude) && p.longitude === String(longitude))

    return (
        <>
            <ImageSelect<Place>
                label="Место"
                selected={selected}
                items={places}
                onChange={(place) => onChange({ latitude: place.latitude, longitude: place.longitude })}
                onAdd={toggleFindPlace}
            />
            <Dialog onClose={toggleFindPlace} open={findPlace} fullScreen TransitionComponent={TransitionDialog}>
                <Places
                    onSuccess={(place) => {
                        onChange({ latitude: place.latitude, longitude: place.longitude})
                        toggleFindPlace()
                    }}
                    onClose={toggleFindPlace}
                />
            </Dialog>
        </>
    );
}

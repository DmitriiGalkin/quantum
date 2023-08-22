import React from 'react';
import {ImageSelect} from "./ImageSelect";
import {Place} from "../tools/dto";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "./TransitionDialog";
import Places from "../dialogs/Places";
import {useToggle} from "usehooks-ts";
import {usePlaces} from "../tools/service";

interface PlaceSelectProps {
    onChange: (place: { latitude: string, longitude: string }) => void
    latitude?: string
    longitude?: string
}

export function PlaceSelectDefault({ onChange, latitude, longitude }: PlaceSelectProps) {
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
            <Places
                open={findPlace}
                onSuccess={(place: Place) => {
                    onChange({ latitude: place.latitude, longitude: place.longitude})
                    toggleFindPlace()
                }}
                onClose={toggleFindPlace}
            />
        </>
    );
}

export const PlaceSelect = React.memo(PlaceSelectDefault);


import React from 'react';
import {ImageSelect} from "./ImageSelect";
import {Place} from "../tools/dto";
import Places from "../dialogs/Places";
import {useToggle} from "usehooks-ts";
import {usePlaces} from "../tools/service";

interface PlaceSelectProps {
    onChange: (place: Place) => void
    value?: number
}

export function PlaceSelectDefault({ onChange, value }: PlaceSelectProps) {
    const [findPlace, toggleFindPlace] = useToggle()
    const { data: places = [] } = usePlaces()
    const selected = places.find(p => p.id === value)

    return (
        <>
            <ImageSelect<Place>
                label="Место"
                selected={selected}
                items={places}
                onChange={onChange}
                onAdd={toggleFindPlace}
            />
            <Places
                open={findPlace}
                onSuccess={(place: Place) => {
                    onChange(place)
                    toggleFindPlace()
                }}
                onClose={toggleFindPlace}
            />
        </>
    );
}

export const PlaceSelect = React.memo(PlaceSelectDefault);


import React, {InputHTMLAttributes, useState} from 'react';
import {ImageSelect} from "./ImageSelect";
import {Place} from "../tools/dto";
import Places from "../dialogs/Places";
import {useToggle} from "usehooks-ts";
import {usePlaces} from "../tools/service";
import {COLOR_PAPER} from "../tools/theme";
import {useInputStyles} from "./helper";
import EditPlace from "../dialogs/EditPlace";
import {getCenter} from "../tools/map";

interface PlaceSelectProps {
    onChange: (place: Place) => void
    value?: number
}

export function PlaceSelectDefault({ onChange, value }: PlaceSelectProps) {
    const { data: places = [] as Place[], refetch } = usePlaces()
    const [latitude, longitude] = getCenter(places)
    const [state, setState] = useState({ center: [latitude, longitude], zoom: 16 } )
    const [openCreatePlace, toggleOpenCreatePlace] = useToggle()

    const place = places.find(p => p.id === value)

    return (
        <div>
            <label htmlFor="place">Место</label>
            <div style={{
                display: 'block',
                width: '100%',
                padding: 10,
                fontSize: '13px',
                lineHeight: 1.5,
                color: '#212529',
                backgroundColor: COLOR_PAPER,
                backgroundClip: 'padding-box',
                borderRadius: 10,
                position: 'relative'
            }}>
                {place && (
                    <div style={{ position: 'absolute', left: 150, top: 20, width: 300 }}>
                        {place?.title}
                    </div>
                )}
                <label onClick={toggleOpenCreatePlace} htmlFor="place" style={{ padding: '8px 12px', borderRadius: '6.998px', border: '0.778px solid #E1E1E1', background: '#FFFFFF', fontWeight: 400, opacity:0.7 }}>{value ? 'Место выбрано' : 'На карте'}</label>
            </div>
            <EditPlace state={state} onSuccess={(place: Place) => {refetch(); onChange(place)}} open={openCreatePlace} onClose={toggleOpenCreatePlace}  />
        </div>
    );
}

export const PlaceSelect2 = React.memo(PlaceSelectDefault);


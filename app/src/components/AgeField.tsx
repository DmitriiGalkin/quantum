import React from 'react';
import {Stack} from "@mui/material";
import {getDayOfWeekTitleLong} from "../tools/date";
import {Timing} from "../tools/dto";
import Checkbox from "./Checkbox";
import Switch from "./Switch";
import {useToggle} from "usehooks-ts";
import {useInputStyles} from "./helper";
import {Input} from "./Input";

interface PriceFieldProps {
    ageFrom?: number
    ageTo?: number
    onChange: (age: { ageFrom?: number, ageTo?: number }) => void
}

export function AgeField({ ageFrom, ageTo, onChange }: PriceFieldProps) {
    const [view, toggleView] = useToggle()

    return (
        <div>
            <Stack spacing={3} direction="row" alignItems="center" justifyContent="space-between">
                <div>Возраст участников</div>
                <Switch checked={view} onChange={toggleView}/>
            </Stack>
            {view && (
                <Stack spacing={1} >
                    <Input
                        type="number"
                        name='price'
                        label="Минимальный возраст"
                        value={ageFrom}
                        onChange={(e) => onChange({ ageFrom: Number(e.target.value), ageTo })}
                    />
                    <Input
                        type="number"
                        name='price'
                        label="Максимальный возраст"
                        value={ageTo}
                        onChange={(e) => onChange({ ageTo: Number(e.target.value), ageFrom })}
                    />
                </Stack>
            )}
        </div>
    );
}

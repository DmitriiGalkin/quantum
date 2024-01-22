import React from 'react';
import {Stack} from "@mui/material";
import Switch from "./Switch";
import {useToggle} from "usehooks-ts";
import {Input} from "./Input";

interface PriceFieldProps {
    ageFrom?: number
    ageTo?: number
    onChange: (age: { ageFrom?: number, ageTo?: number }) => void
}

export function AgeField({ ageFrom, ageTo, onChange }: PriceFieldProps) {
    return (
        <div>
            <label>Возраст</label>
            <Stack spacing={2} direction="row" alignItems="center">
                <Input
                    type="number"
                    name='price'
                    // label="Возраст (лет)"
                    value={ageFrom}
                    onChange={(e) => onChange({ ageFrom: Number(e.target.value), ageTo })}
                    placeholder="c"
                />
                <span>—</span>
                <Input
                    type="number"
                    name='price'
                    // label="Макс. возраст"
                    value={ageTo}
                    onChange={(e) => onChange({ ageTo: Number(e.target.value), ageFrom })}
                    placeholder="по"
                />
                <span>лет</span>
            </Stack>
        </div>
    );
}

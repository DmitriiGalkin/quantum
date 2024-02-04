import React from 'react';
import {Stack} from "@mui/material";
import {Input} from "./Input";

interface PriceFieldProps {
    ageFrom?: number
    ageTo?: number
    onChange: (age: { ageFrom?: number, ageTo?: number }) => void
}

export function AgeField({ ageFrom, ageTo, onChange }: PriceFieldProps) {
    return (
        <div style={{ width: 100 }}>
            <label>Возраст, лет</label>
            <Stack spacing={1} direction="row" alignItems="center">
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
            </Stack>
        </div>
    );
}

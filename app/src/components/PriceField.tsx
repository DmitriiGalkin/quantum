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
    value?: number
    onChange: (price: number) => void
}

export function PriceField({ value, onChange }: PriceFieldProps) {
    const [view, toggleView] = useToggle()
    const classes = useInputStyles();

    return (
        <div>
            <Stack spacing={3} direction="row" alignItems="center" justifyContent="space-between">
                <div>Стоимость</div>
                <Switch checked={view} onChange={toggleView}/>
            </Stack>
            {view && (
                <Stack spacing={1} >
                    <Input
                        name='price'
                        label="Стоимость с участника"
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                    />
                </Stack>
            )}
        </div>
    );
}

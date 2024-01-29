import React from 'react';
import {Stack} from "@mui/material";
import Switch from "./Switch";
import {useToggle} from "usehooks-ts";
import {Input} from "./Input";
import Typography from "./Typography";

interface Price {
    user?: number
    meet?: number
}

interface PriceFieldProps {
    price?: Price
    onChange: (price: Price) => void
}

export function PriceField({ price, onChange }: PriceFieldProps) {
    const [view, toggleView] = useToggle()

    return (
        <div>
            <Stack spacing={3} direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="Body-Bold">Стоимость</Typography>
                <Switch checked={view} onChange={toggleView}/>
            </Stack>
            {view && (
                <Stack spacing={1} direction="row" >
                    <Input
                        name='price'
                        label="Стоимость с участника"
                        value={price?.user}
                        onChange={(e) => onChange({ ...price, user: Number(e.target.value) })}
                    />
                    <Input
                        name='price'
                        label="Стоимость с группы"
                        value={price?.meet}
                        onChange={(e) => onChange({ ...price, meet: Number(e.target.value) })}
                    />
                </Stack>
            )}
        </div>
    );
}

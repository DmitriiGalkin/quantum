import React, {TextareaHTMLAttributes} from 'react';
import {useInputStyles} from "./helper";
import {Stack} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {Icon} from "./Icon";
import {IconName} from "./Icon";

export interface Parameter {
    name: IconName,
    title: string,
    value?: JSX.Element,
}
interface ParametersProps {
    items: Parameter[]
}
export function Parameters({ items }: ParametersProps) {
    return (
        <div id="parameters" style={{ paddingTop: 48}}>
            <Stack spacing={3} direction="column">
                {items.map(({ name, title, value }) => (
                    <Grid container key={title}>
                        <Grid xs={6}>
                            <Stack spacing={2} direction="row" alignItems="center">
                                <Icon name={name}/>
                                <div style={{ fontWeight: 900 }}>
                                    {title}
                                </div>
                            </Stack>
                        </Grid>
                        <Grid xs={6}>
                            <div style={{ color: '#070707', letterSpacing: '0.05em' }}>
                                {value}
                            </div>
                        </Grid>
                    </Grid>
                ))}
            </Stack>
        </div>
    );
}

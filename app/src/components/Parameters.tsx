import React from 'react';
import {Stack} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {Icon, IconName} from "./Icon";
import Typography from "./Typography";

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
        <Stack spacing={1} direction="column">
            {items.map(({ name, title, value }) => (
                <Grid container key={title}>
                    <Grid xs={6}>
                        <Stack spacing={1} direction="row" alignItems="center">
                            <Icon name={name}/>
                            <Typography variant="Body2-Bold">{title}</Typography>
                        </Stack>
                    </Grid>
                    <Grid xs={6}>
                        <Typography variant="Body">{value}</Typography>
                    </Grid>
                </Grid>
            ))}
        </Stack>
    );
}

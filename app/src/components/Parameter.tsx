import React from 'react';
import {Stack} from "@mui/material";
import {Icon, IconName} from "./Icon";
import Typography from "./Typography";

interface ParameterProps {
    name: IconName
    title: string | number
}
export function Parameter({ title, name }: ParameterProps) {
    return (
        <Stack spacing={1} direction="row" alignContent="center" alignItems="center">
            <Icon name={name} />
            <Typography variant="Body">{title}</Typography>
        </Stack>
    );
}

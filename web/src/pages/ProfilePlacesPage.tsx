import React from 'react';
import {Box, Stack} from "@mui/material";
import {useProfilePlaces} from "../modules/place";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Номер', width: 70 },
    { field: 'title', headerName: 'Название', width: 130 },
    { field: 'description', headerName: 'Описание', width: 330 },
];

export default function ProfilePlacesPage() {
    const { data: places = [] } = useProfilePlaces()

    return (
        <Stack spacing={2}>
            <Box>
                Пространства пользователя
            </Box>
            <Box>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={places}
                        columns={columns}
                    />
                </div>
            </Box>
        </Stack>
    );
}
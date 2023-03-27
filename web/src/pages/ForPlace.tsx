import React from 'react';
import {Box, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function ForPlacePage() {
    const navigate = useNavigate();
    const handleBack = () => navigate('/place')

    return (
        <Stack spacing={2}>
            <Box>
                Пространствам
            </Box>
            <Box>
                Плати барщину и будут тебе посетители. Первый месяц бесплатно.
            </Box>
            <Box>
                Пример как выглядит статистика успешного пространства.
            </Box>
            <div onClick={handleBack}>СОЗДАТЬ ПРОСТРАНСТВО</div>
            <div onClick={() => navigate(`/place/1/edit` )}>Редактировать пространство</div>
        </Stack>
    );
}
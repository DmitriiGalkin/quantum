import React from 'react';
import {Box, Stack} from "@mui/material";

export default function ForMasterPage() {
    return (
        <Stack spacing={2}>
            <Box>
                Мастерам
            </Box>
            <Box>
                Участвуй в проектах, проводи встречи, развивай участников
            </Box>
            <Box>
                Пример как выглядит статистика успешного мастера.
            </Box>
        </Stack>
    );
}
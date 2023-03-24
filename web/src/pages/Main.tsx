import React from 'react';
import {Box, Stack} from "@mui/material";

const STATS = [
    {
        title: 'Проектов',
        value: 5,
    },
    {
        title: 'Участников',
        value: 8,
    },
    {
        title: 'Уникальных ценности',
        value: 24,
    },
]

export default function MainPage() {
    return (
        <Stack spacing={2}>
            <Box>
                Главная страница
            </Box>
            <Box>
                QUANTUM
                - образовательная платформа,
                раскрывающая уникальные ценности участника
            </Box>
            <Box>
                Установить приложение для участников
                - приложение устанавливается без сложностей
                Кнопка
            </Box>
            <Box>
                Вот так расцветает планета нашими уникальностями
                - Вера в свои уникальные ценности - истинный путь развитию собственного проекта
                {STATS.map(({ title, value }) => (
                    <div key={title}>
                        {title}
                        {value}
                    </div>
                ))}
            </Box>
        </Stack>
    );
}
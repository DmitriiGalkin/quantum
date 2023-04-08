import React from 'react';
import {Box, IconButton, Stack, Typography} from "@mui/material";
import TaskCard from "../components/TaskCard";
import {useOnlyUserTasks} from "../modules/task";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import {useOnlyUserUniques} from "../modules/user";

export default function TasksPage() {
    const { data: uniques = [] } = useOnlyUserUniques()

    return (
        <>
            {Boolean(uniques.length) ? (
                <Stack spacing={2}>
                    {uniques.map((unique) => (
                        <Box key={unique.id} sx={{ display: 'flex' }}>
                            <Typography variant="subtitle1" color="primary" style={{ flexGrow: 1 }}>
                                {unique.title}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ paddingRight: 1}}>
                                {unique.points}
                            </Typography>
                            <AutoAwesomeIcon style={{ width: 20, height: 20 }} color="primary"/>
                            {userD?.points && <IconButton size="small" onClick={() => toTop({ user: userD, unique, points: 1 })}>
                                <ArrowUpward/>
                            </IconButton>}
                        </Box>
                    ))}
                </Stack>
            ) : (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="80vh"
                >
                    <span>Твои уникальные ценности есть и они обязательно скоро проявятся!</span>
                </Box>
            )}
        </>
    );
}
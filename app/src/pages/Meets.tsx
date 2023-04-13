import React from 'react';
import {Meet} from "../modules/meet";

import Day from "../components/Day";
import {getMeetsGroup} from "../tools/helper";
import {Box, Link, Stack} from "@mui/material";
import {useMeets} from "../modules/user";
import {useMain} from "../layouts/MainLayout";

export default function MeetsPage() {
    const { data: meets = [], refetch } = useMeets()
    const meetsGroup = getMeetsGroup(meets)

    const { setNewProject, setOpenMap } = useMain();
    return (
        <>
            {Boolean(meetsGroup.length) ? (
                <Stack spacing={2}>
                    {meetsGroup.map(([date, meets]) => (
                        <Day key={date} date={date} meets={meets as Meet[]} refetch={refetch} />
                    ))}
                </Stack>
            ) : (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="80vh"
                >
                    <span>Встреч нет. Попробуйте найти интересные проекты на <Link onClick={() => setOpenMap(true)}>карте</Link>. Или <Link onClick={() => setNewProject(true)}>создать свой</Link>!</span>
                </Box>
            )}
        </>
    );
}

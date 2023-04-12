import React from 'react';
import {Meet} from "../modules/meet";

import Day from "../components/Day";
import {getMeetsGroup} from "../tools/helper";
import {Box, Link, Stack} from "@mui/material";
import {useUserMeet} from "../modules/user";
import {useMain} from "../layouts/MainLayout";

export default function MeetsPage() {
    const { data: meets = [] } = useUserMeet()
    const meetsGroup = getMeetsGroup(meets)

    const { setOpenCreateProject, setOpenMap } = useMain();
    return (
        <>
            {Boolean(meetsGroup.length) ? (
                <Stack spacing={2}>
                    {meetsGroup.map(([date, meets]) => (
                        <Day key={date} date={date} meets={meets as Meet[]} />
                    ))}
                </Stack>
            ) : (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="80vh"
                >
                    <span>Встреч нет. Попробуйте найти интересные проекты на <Link onClick={() => setOpenMap(true)}>карте</Link>. Или <Link onClick={() => setOpenCreateProject(true)}>создать свой</Link>!</span>
                </Box>
            )}
        </>
    );
}

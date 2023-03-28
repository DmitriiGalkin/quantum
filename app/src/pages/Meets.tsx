import React from 'react';
import {Meet} from "../modules/meet";

import Day from "../components/Day";
import {getMeetsGroup} from "../tools/helper";
import {Box, Stack} from "@mui/material";
import {useUserMeet} from "../modules/user";
import {uri} from "../auth";

export default function MeetsPage() {
    const { data: meets = [] } = useUserMeet()
    const meetsGroup = getMeetsGroup(meets)

    return (
        <Stack spacing={2}>
            {meetsGroup.map(([date, meets]) => (
                <Day key={date} date={date} meets={meets as Meet[]}/>
            ))}
        </Stack>
    );
}

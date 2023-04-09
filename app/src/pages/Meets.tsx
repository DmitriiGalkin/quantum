import React from 'react';
import {Meet} from "../modules/meet";

import Day from "../components/Day";
import {getMeetsGroup} from "../tools/helper";
import {Box, Link, Stack} from "@mui/material";
import {useAddMeetUser, useDeleteMeetUser, useUserMeet} from "../modules/user";
import {useNavigate} from "react-router-dom";
import {useUser2} from "../layouts/MainLayout";
//{setOpenMap}: {setOpenMap?: (open: boolean) => void}
export default function MeetsPage() {
    const navigate = useNavigate();

    const { data: meets = [] } = useUserMeet()
    const meetsGroup = getMeetsGroup(meets)
    const addMeetUser = useAddMeetUser()
    const deleteMeetUser = useDeleteMeetUser()
    const onClickEnter = (meetId: number) => () => addMeetUser.mutate({ meetId })
    const onClickLeave = (meetId: number) => () => deleteMeetUser.mutate({ meetId })
    //const {setOpenMap} = useOutletContext<{setOpenMap?: (open: boolean) => void}>();
    const { setOpenCreateProject } = useUser2();
    return (
        <>
            {Boolean(meetsGroup.length) ? (
                <Stack spacing={2}>
                    {meetsGroup.map(([date, meets]) => (
                        <Day key={date} date={date} meets={meets as Meet[]} onClickEnter={onClickEnter} onClickLeave={onClickLeave}/>
                    ))}
                </Stack>
            ) : (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="80vh"
                >
                    <span>Встреч нет. Попробуйте найти интересные проекты на <Link onClick={() => navigate(`/map`)}>карте</Link>. Или <Link onClick={() => setOpenCreateProject(true)}>создать свой</Link>!</span>
                </Box>
            )}
        </>
    );
}
//onClick={() => setOpenMap(true)}
//onClick={() => setOpenCreateProject(true)}
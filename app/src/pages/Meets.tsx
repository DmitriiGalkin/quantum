import React from 'react';
import {Box, Link, Stack} from "@mui/material";
import {useMeets} from "../modules/user";
import {useMain} from "../layouts/MainLayout";
import Calendar from "../components/Calendar";
import QContainer from "../components/QContainer";
import MeetCard from "../components/cards/MeetCard";

export default function MeetsPage() {
    const { data: meets = [], refetch } = useMeets()
    const { setNewProject, setOpenMap } = useMain();
    return (
        <>
            <div style={{ padding: '22px 15px 29px' }}>
                <Calendar meets={meets} />
            </div>
            <div style={{ padding: '0 15px' }}>
            {Boolean(meets.length) ? (
                <Stack spacing={3}>
                    {meets.map((meet, index) =>
                        <div key={meet.id}>
                            <div key={meet.id}>
                                <MeetCard meet={meet} refetch={refetch} />
                            </div>
                        </div>
                    )}
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
            </div>
        </>
    );
}

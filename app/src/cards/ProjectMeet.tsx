import React from 'react';
import {Meet, Project, Visit} from "../tools/dto";
import {convertToMeetDate, convertToMeetTime} from "../tools/date";
import {Avatar, AvatarGroup, Box, Chip, Stack} from "@mui/material";
import {useCreateVisit, useDeleteVisit} from "../tools/service";
import {makeStyles} from '@mui/styles';
import {BOX_SHADOW, DEFAULT_COLOR} from "../tools/theme";
import {useNavigate} from "react-router-dom";
import {getAgeLabel} from "../tools/helper";
import {MeetCard} from "./Meet";

interface ProjectMeetCardProps {
    project: Project
    meet: Meet
    selected?: boolean
    refetch?: () => void
}
const useStyles = makeStyles(() => ({
    blockInner: {
        width: '100%',
        paddingTop: '116%',
        position: 'relative',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '9.5px 0 0 9.5px',
    },
}));
export function ProjectMeetCard({ project, meet, refetch }: ProjectMeetCardProps) {
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <Stack spacing={2} direction="row" style={{ backgroundColor: DEFAULT_COLOR, borderRadius: 16, boxShadow: BOX_SHADOW, border: '1px solid black', padding: 11 }} onClick={() => navigate(`/meet/${meet.id}`)}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 5px' }}>
                <div style={{ fontSize: 33 }}>17</div>
                <div style={{ fontSize: 15 }}>дек</div>
            </div>
            <div style={{ flexGrow: 1 }}>
                <MeetCard meet={meet} />
            </div>
        </Stack>
    );
}

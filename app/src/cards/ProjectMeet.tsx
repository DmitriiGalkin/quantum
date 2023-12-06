import React from 'react';
import {Meet, Project, Visit} from "../tools/dto";
import {Avatar, AvatarGroup, Box, Chip, Stack} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {BOX_SHADOW, DEFAULT_COLOR} from "../tools/theme";
import {MeetCard} from "./MeetCard";

interface ProjectMeetCardProps {
    project: Project
    meet: Meet
    selected?: boolean
    refetch?: () => void
}
export function ProjectMeetCard({ project, meet, refetch }: ProjectMeetCardProps) {
    return (
        <Stack spacing={2} direction="row" style={{ padding: '18px 0'}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: 33, lineHeight: '33px' }}>17</div>
                <div style={{ fontSize: 15 }}>дек</div>
            </div>
            <div style={{ flexGrow: 1 }}>
                <MeetCard meet={meet} />
            </div>
        </Stack>
    );
}

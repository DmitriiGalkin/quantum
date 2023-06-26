import React from 'react';
import {AppBar, Box, IconButton, Skeleton, Stack, TextField, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {TextFieldProps} from "@mui/material/TextField/TextField";
import ProjectCard from "../cards/ProjectCard";
import {getProjectDefaultDatetime} from "../../dialogs/CreateMeet";
import {Place} from "../../modules/place";
import {Project} from "../../modules/project";
import ProjectFieldCard from "./ProjectFieldCard";
import {getWeek} from "../../tools/helper";
import Calendar from "../Calendar";
import dayjs from "dayjs";

interface DateFieldProps {
    label: string
    selectedDate?: string
    onChange: (date: string) => void
}
export function DateField({ label, selectedDate, onChange }: DateFieldProps) {
    const selectedDate2 = dayjs(selectedDate).format('YYYY-MM-DD')
    const week = getWeek(selectedDate2)

    return (
        <Stack spacing={2} direction="column">
            <div style={{ fontWeight: 900, fontSize: 18, color: '#070707' }}>
                {label}
            </div>
            <div>
                <Calendar week={week} onChange={onChange} />
            </div>
        </Stack>
    );
}

export default DateField;

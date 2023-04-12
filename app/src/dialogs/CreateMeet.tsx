import React, {useEffect, useState} from 'react';
import {Box, Button, Slider, Stack, Typography} from "@mui/material";
import {NewMeet, useAddMeet} from "../modules/meet";
import TabPanel from "../components/TabPanel";
import ProjectCard from "../components/cards/ProjectCard";
import {useUserProjects} from "../modules/user";
import {Project, useProject} from "../modules/project";
import {CalendarPicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {Place, usePlace, usePlaces} from "../modules/place";
import PlaceCard from "../components/cards/PlaceCard";
import {useNavigate} from "react-router-dom";
import Back from "../components/Back";

export function valuetext(value: number) {
    return `${value}°C2222`;
}
function toHoursAndMinutes(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
}
export function valuetext2(value: number) {
    const {hours, minutes} = toHoursAndMinutes(value)
    return `${hours}:${minutes === 0 ? '00' : minutes}`;
}

export const getProjectDefaultDatetime = (): [string, string] => {
    const datetime = dayjs(dayjs().format('YYYY-MM-DD')).hour(10).format('YYYY-MM-DDTHH:mm:ss')
    const endDatetime = dayjs(dayjs().format('YYYY-MM-DD')).hour(11).format('YYYY-MM-DDTHH:mm:ss')

    return [datetime, endDatetime]
}

export interface CreateMeetDialogProps {
    newMeet?: NewMeet
    onClose: () => void;
}
export default function CreateMeetDialog({ onClose, newMeet }: CreateMeetDialogProps) {
    const [meet, setMeet] = useState<NewMeet | undefined>()
    const { data: places = [] } = usePlaces()
    const navigate = useNavigate();

    const addMeet = useAddMeet()

    const { data: projects = [] } = useUserProjects()
    const { data: project = {} as Project } = useProject(meet?.projectId)
    const { data: place = {} as Place } = usePlace(meet?.placeId)

    const onClickSave = () => {
        if (meet) {
            const meetWithTimezone = {...meet }
            addMeet.mutateAsync(meetWithTimezone).then(() => {
                navigate(`/project/${meet.projectId}`)
            })
            // onClose()
        }
    };

    const calendarPickerDate = dayjs(meet?.datetime)
    const sliderValue = dayjs(meet?.datetime).hour() * 60 + dayjs(meet?.datetime).minute()

    const calendarPickerOnChange = (date: Dayjs | null) => {
        if (!date) return
        setMeet({
            ...meet,
            datetime: date.startOf('day').add(dayjs(meet?.datetime).hour(), 'hour').add(dayjs(meet?.datetime).minute(), 'minute').format('YYYY-MM-DDTHH:mm:ss'),
        })
    }
    const sliderOnChange = (event: any, newValue: number | number[]) => {
        const minutes = newValue as number
        setMeet({
            ...meet,
            datetime: dayjs(meet?.datetime).startOf('day').add(minutes, 'minute').format('YYYY-MM-DDTHH:mm:ss'),
        })
    };

    useEffect(() => {
        setMeet(newMeet)
    }, [newMeet])

    return (
        <div>
            <Back title="Создать встречу" onClick={onClose}/>
            <TabPanel value={meet?.activeStep || 0} index={0}>
                <Typography variant="h5" sx={{ paddingBottom: 1 }}>
                    Выберите проект для встречи
                </Typography>
                <Stack spacing={2}>
                    {projects.map((project) => <ProjectCard key={project.id} active project={project} selected={meet?.projectId === project.id} onClick={() => {
                        const [datetime, endDatetime] = getProjectDefaultDatetime()
                        setMeet({
                            ...meet,
                            projectId: project.id,
                            datetime,
                            endDatetime,
                            activeStep: 1,
                        })
                    }}/>)}
                </Stack>
            </TabPanel>
            <TabPanel value={meet?.activeStep || 0} index={1}>
                <Typography variant="h5" sx={{ paddingBottom: 1 }}>
                    Выберите место для встречи
                </Typography>
                <Stack spacing={2}>
                    {places.map((place) => (
                        <PlaceCard key={place.id} place={place} selected={meet?.placeId === place.id} onClick={() => {
                            setMeet({ ...meet, placeId: place.id, activeStep: 2, })
                        }}/>
                    ))}
                </Stack>
            </TabPanel>
            <TabPanel value={meet?.activeStep || 0} index={2}>
                <div>
                    <ProjectCard project={project}/>
                    <PlaceCard place={place}/>
                    <Box sx={{
                        fontSize: '15px',
                        '& .MuiPickersFadeTransitionGroup-root': {
                            fontFamily: 'Manrope, Arial',
                            fontSize: 16,
                            fontWeight: 700,
                            textTransform: 'capitalize',
                        },
                        '& .MuiPickersCalendarHeader-root': {
                            justifyContent: "space-between",
                            width: '100%',
                            marginTop: 1,
                        },
                        '& .MuiPickersCalendarHeader-labelContainer .MuiPickersCalendarHeader-switchViewButton': {
                            display: 'none',
                        },
                        '& .MuiPickersDay-root.Mui-selected': {
                            backgroundColor: (theme)=> theme.palette.primary.main + '!important',
                        }
                    }}>
                        <CalendarPicker onChange={calendarPickerOnChange} date={calendarPickerDate} disablePast/>
                    </Box>
                    <Box sx={{
                        width: '280px',
                        margin: '0 auto',
                        '& .MuiSlider-valueLabel': {
                            fontFamily: 'Bebas Neue',
                            padding: '4px 6px',
                        }
                    }}>
                        <Typography variant="h5" sx={{ paddingBottom: 6 }}>
                            Укажите время
                        </Typography>
                        <Slider
                            value={sliderValue}
                            onChange={sliderOnChange}
                            valueLabelDisplay="on"
                            aria-labelledby="range-slider"
                            valueLabelFormat={valuetext2}
                            getAriaValueText={valuetext}
                            min={600} // Когда начинает работать место, в котором проводится проект
                            max={1080} // Когда заканчивает работать место, в котором проводится проект
                            step={15} // Каждые 15 минут
                        />
                    </Box>
                    <Button
                        onClick={onClickSave}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        size="large"
                    >
                        Создать
                    </Button>
                </div>
            </TabPanel>
        </div>
    );
}
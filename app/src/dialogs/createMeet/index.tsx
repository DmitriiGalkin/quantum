import React, {useState} from 'react';
import {Box, Slider, Stack, Typography} from "@mui/material";
import ForwardAppBar from "../../components/ForwardAppBar";
import {Meet, useAddMeet} from "../../modules/meet";
import {TabPanel} from "../../components/tabs";
import {DEFAULT_MEET, getProjectDefaultDatetime, valuetext, valuetext2} from "./helper";
import QStepper from "../../components/QStepper";
import ProjectCard from "../../components/ProjectCard";
import {useUserProjects} from "../../modules/user";
import Day from "../../components/Day";
import {convertToMeetsGroupTime2, toServerDatetime} from "../../tools/date";
import {Project, useProject} from "../../modules/project";
import {CalendarPicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {Place, usePlace, usePlaces} from "../../modules/place";
import PlaceCard from "../../components/PlaceCard";
import Dialog from "@mui/material/Dialog";

export interface CreateMeetDialogProps {
    onClose: () => void;
}
export default function CreateMeetDialog({ onClose }: CreateMeetDialogProps) {
    const [meet, setMeet] = useState(DEFAULT_MEET)
    const [activeStep, setActiveStep] = React.useState(0);
    const { data: places = [] } = usePlaces()

    const addMeet = useAddMeet()

    const { data: projects = [] } = useUserProjects()
    const { data: project = {} as Project } = useProject(meet.projectId || 0)
    const { data: place = {} as Place } = usePlace(meet.placeId || 0)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (activeStep === 2) {
            addMeet.mutate(meet)
        }
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const calendarPickerDate = dayjs(meet.datetime)
    const sliderValue = [dayjs(meet.datetime).hour() * 60 + dayjs(meet.datetime).minute(), dayjs(meet.endDatetime).hour() * 60 + dayjs(meet.endDatetime).minute()]

    const calendarPickerOnChange = (date: Dayjs | null) => {
        if (!date) return
        setMeet({
            ...meet,
            datetime: date.startOf('day').add(dayjs(meet.datetime).hour(), 'hour').add(dayjs(meet.datetime).minute(), 'minute').format('YYYY-MM-DDTHH:mm:ss'),
            endDatetime: date.startOf('day').add(dayjs(meet.endDatetime).hour(), 'hour').add(dayjs(meet.endDatetime).minute(), 'minute').format('YYYY-MM-DDTHH:mm:ss'),
        })
    }
    const sliderOnChange = (event: any, newValue: number | number[]) => {
        const [minutes, endMinutes] = newValue as number[]
        setMeet({
            ...meet,
            datetime: dayjs(meet.datetime).startOf('day').add(minutes, 'minute').format('YYYY-MM-DDTHH:mm:ss'),
            endDatetime: dayjs(meet.endDatetime).startOf('day').add(endMinutes, 'minute').format('YYYY-MM-DDTHH:mm:ss'),
        })
    };
    console.log(place, 'place')

    return (
        <Dialog onClose={onClose} open={true} fullScreen>
            <ForwardAppBar title="Создать встречу" onClick={onClose}/>
                <TabPanel value={activeStep} index={0}>
                    <Typography variant="h5" sx={{ paddingBottom: 1 }}>
                        Выберите проект для встречи
                    </Typography>
                    <Stack spacing={2}>
                        {projects.map((project) => <ProjectCard active project={project} selected={meet.projectId === project.id} onClick={() => {
                            const [datetime, endDatetime] = getProjectDefaultDatetime(project)
                            setMeet({
                                ...meet,
                                projectId: project.id,
                                datetime,
                                endDatetime,
                            })
                            handleNext()
                        }}/>)}
                    </Stack>
                </TabPanel>
                <TabPanel value={activeStep} index={1}>
                    <Typography variant="h5" sx={{ paddingBottom: 1 }}>
                        Выберите место для встречи
                    </Typography>
                    <Stack spacing={2}>
                        {places.map((place) => (
                            <PlaceCard key={place.id} place={place} selected={meet.placeId === place.id} onClick={() => {
                                setMeet({ ...meet, placeId: place.id })
                                handleNext()
                            }}/>
                        ))}
                    </Stack>
                </TabPanel>
                <TabPanel value={activeStep} index={2}>
                    <div>
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
                    </div>
                </TabPanel>
                <TabPanel value={activeStep} index={3}>
                    <div>
                        <Typography variant="h5">
                            Проект
                        </Typography>
                        <ProjectCard project={project}/>
                        <Typography variant="h5">
                            Место
                        </Typography>
                        <PlaceCard place={place}/>
                        <Typography variant="h5">
                            Время
                        </Typography>
                        <Day date={convertToMeetsGroupTime2(meet.datetime)} meets={[{...meet, id: 0, project, users: [], datetime: toServerDatetime(meet.datetime)}] as Meet[]}/>
                    </div>
                </TabPanel>
                <TabPanel value={activeStep} index={4}>
                    <Typography>
                        Встреча создана!
                    </Typography>
                </TabPanel>
            <QStepper steps={4} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext}/>
        </Dialog>
    );
}
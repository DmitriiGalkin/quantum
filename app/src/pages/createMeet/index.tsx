import React, {useState} from 'react';
import {Box, Slider, Typography} from "@mui/material";
import ForwardAppBar from "../../components/ForwardAppBar";
import {Meet, useAddMeet} from "../../modules/meet";
import {TabPanel} from "../../components/tabs";
import {DEFAULT_MEET, getProjectDefaultDatetime, valuetext, valuetext2} from "./helper";
import QStepper from "../../components/QStepper";
import QContainer from "../../components/QContainer";
import ProjectCard from "../../components/ProjectCard";
import {useUserProjects} from "../../modules/user";
import Day from "../../components/Day";
import {convertToMeetsGroupTime2, toServerDatetime} from "../../tools/date";
import {Project, useProject} from "../../modules/project";
import {CalendarPicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {useUnit} from "../../tools/hooks";

export default function CreateMeetView() {
    const [meet, setMeet] = useState(DEFAULT_MEET)
    const [activeStep, setActiveStep] = React.useState(0);
    const addMeet = useAddMeet()
    const user = useUnit();

    const { data: projects = [] } = useUserProjects(user.id)
    const { data: project = {} as Project } = useProject(meet.projectId || 0)
    //const { data: user = {} as User } = useUser(1)

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

    return (
        <div>
            <ForwardAppBar title="Создать встречу"/>
            <QContainer>
                <TabPanel value={activeStep} index={0}>
                    <div>
                        <Typography variant="h5" sx={{ paddingBottom: 1 }}>
                            Выберите проект
                        </Typography>
                        {projects.map((project) => <ProjectCard {...project} onClick={() => {
                            const [datetime, endDatetime] = getProjectDefaultDatetime(project)
                            setMeet({
                                ...meet,
                                projectId: project.id,
                                datetime,
                                endDatetime,
                            })
                            handleNext()
                        }}/>)}
                    </div>
                </TabPanel>
                <TabPanel value={activeStep} index={1}>
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
                <TabPanel value={activeStep} index={2}>
                    <div>
                        <Typography variant="h5" sx={{ paddingBottom: 6 }}>
                            Проект
                        </Typography>
                        <ProjectCard {...project} onClick={() => console.log('333')}/>
                        <Typography variant="h5" sx={{ paddingBottom: 6 }}>
                            Время
                        </Typography>
                        <Day date={convertToMeetsGroupTime2(meet.datetime)} meets={[{...meet, id: 0, project, users: [user], datetime: toServerDatetime(meet.datetime)}] as Meet[]}/>
                    </div>
                </TabPanel>
                <TabPanel value={activeStep} index={3}>
                    <Typography>
                        Встреча создана!
                    </Typography>
                </TabPanel>
            </QContainer>
            <QStepper steps={4} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext}/>
        </div>
    );
}
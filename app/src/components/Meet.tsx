import React from 'react';
import {makeStyles} from '@mui/styles';
import {Avatar, AvatarGroup, Box, Stack, Theme} from "@mui/material";
import {Meet} from "../modules/meet";
import {convertToMeetDateLong, convertToMeetTime} from "../tools/date";
import Grid from "@mui/material/Unstable_Grid2";
import {useAuth} from "../tools/auth";
import {getOnShare} from "../tools/share";

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        position: 'absolute',
        top: -33,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: `28px 28px 0 0`,
        padding: '24px 26px'
    },
    block: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 12,
        padding: 12,
    },
    large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    image: {
        width: '100%',
        height: 230,
        objectFit: 'cover',
    },
}));
interface MeetComponentProps {
    meet: Meet
    renderHeader?: () => JSX.Element
    renderFooter?: () => JSX.Element
}
export default function MeetComponent({meet, renderHeader, renderFooter}: MeetComponentProps) {

    const classes = useStyles();

    if (!meet) { return null }

    const parameters = [
        {
            icon: (
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.83593 16H15.1731C17.0607 16 18 15.0961 18 13.3058V2.69419C18 0.903857 17.0607 0 15.1731 0H2.83593C0.948319 0 0 0.895166 0 2.69419V13.3058C0 15.1048 0.948319 16 2.83593 16ZM2.70045 14.6008C1.89664 14.6008 1.45409 14.1923 1.45409 13.384V5.18848C1.45409 4.38892 1.89664 3.97175 2.70045 3.97175H15.2905C16.0943 3.97175 16.5459 4.38892 16.5459 5.18848V13.384C16.5459 14.1923 16.0943 14.6008 15.2905 14.6008H2.70045ZM7.23432 7.0918H7.76719C8.08329 7.0918 8.19167 7.00489 8.19167 6.70071V6.18794C8.19167 5.88376 8.08329 5.78816 7.76719 5.78816H7.23432C6.91821 5.78816 6.80983 5.88376 6.80983 6.18794V6.70071C6.80983 7.00489 6.91821 7.0918 7.23432 7.0918ZM10.2418 7.0918H10.7657C11.0818 7.0918 11.1902 7.00489 11.1902 6.70071V6.18794C11.1902 5.88376 11.0818 5.78816 10.7657 5.78816H10.2418C9.91671 5.78816 9.81736 5.88376 9.81736 6.18794V6.70071C9.81736 7.00489 9.91671 7.0918 10.2418 7.0918ZM13.2403 7.0918H13.7732C14.0893 7.0918 14.1887 7.00489 14.1887 6.70071V6.18794C14.1887 5.88376 14.0893 5.78816 13.7732 5.78816H13.2403C12.9242 5.78816 12.8159 5.88376 12.8159 6.18794V6.70071C12.8159 7.00489 12.9242 7.0918 13.2403 7.0918ZM4.23583 9.93373H4.76869C5.0848 9.93373 5.18414 9.84682 5.18414 9.54264V9.02988C5.18414 8.72569 5.0848 8.63878 4.76869 8.63878H4.23583C3.91972 8.63878 3.81134 8.72569 3.81134 9.02988V9.54264C3.81134 9.84682 3.91972 9.93373 4.23583 9.93373ZM7.23432 9.93373H7.76719C8.08329 9.93373 8.19167 9.84682 8.19167 9.54264V9.02988C8.19167 8.72569 8.08329 8.63878 7.76719 8.63878H7.23432C6.91821 8.63878 6.80983 8.72569 6.80983 9.02988V9.54264C6.80983 9.84682 6.91821 9.93373 7.23432 9.93373ZM10.2418 9.93373H10.7657C11.0818 9.93373 11.1902 9.84682 11.1902 9.54264V9.02988C11.1902 8.72569 11.0818 8.63878 10.7657 8.63878H10.2418C9.91671 8.63878 9.81736 8.72569 9.81736 9.02988V9.54264C9.81736 9.84682 9.91671 9.93373 10.2418 9.93373ZM13.2403 9.93373H13.7732C14.0893 9.93373 14.1887 9.84682 14.1887 9.54264V9.02988C14.1887 8.72569 14.0893 8.63878 13.7732 8.63878H13.2403C12.9242 8.63878 12.8159 8.72569 12.8159 9.02988V9.54264C12.8159 9.84682 12.9242 9.93373 13.2403 9.93373ZM4.23583 12.7844H4.76869C5.0848 12.7844 5.18414 12.6888 5.18414 12.3846V11.8718C5.18414 11.5676 5.0848 11.4807 4.76869 11.4807H4.23583C3.91972 11.4807 3.81134 11.5676 3.81134 11.8718V12.3846C3.81134 12.6888 3.91972 12.7844 4.23583 12.7844ZM7.23432 12.7844H7.76719C8.08329 12.7844 8.19167 12.6888 8.19167 12.3846V11.8718C8.19167 11.5676 8.08329 11.4807 7.76719 11.4807H7.23432C6.91821 11.4807 6.80983 11.5676 6.80983 11.8718V12.3846C6.80983 12.6888 6.91821 12.7844 7.23432 12.7844ZM10.2418 12.7844H10.7657C11.0818 12.7844 11.1902 12.6888 11.1902 12.3846V11.8718C11.1902 11.5676 11.0818 11.4807 10.7657 11.4807H10.2418C9.91671 11.4807 9.81736 11.5676 9.81736 11.8718V12.3846C9.81736 12.6888 9.91671 12.7844 10.2418 12.7844Z" fill="black"/>
                </svg>
            ),
            title: 'Дата',
            value: convertToMeetDateLong(meet.datetime),
        },
        {
            icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18C13.9235 18 18 13.9147 18 9C18 4.07647 13.9147 0 8.99118 0C4.07647 0 0 4.07647 0 9C0 13.9147 4.08529 18 9 18ZM9 16.5C4.83529 16.5 1.50882 13.1647 1.50882 9C1.50882 4.83529 4.82647 1.5 8.99118 1.5C13.1559 1.5 16.4912 4.83529 16.5 9C16.5088 13.1647 13.1647 16.5 9 16.5ZM4.38529 9.95294H8.99118C9.33529 9.95294 9.60882 9.68824 9.60882 9.33529V3.38824C9.60882 3.04412 9.33529 2.77941 8.99118 2.77941C8.64706 2.77941 8.38235 3.04412 8.38235 3.38824V8.72647H4.38529C4.03235 8.72647 3.76765 8.99118 3.76765 9.33529C3.76765 9.68824 4.03235 9.95294 4.38529 9.95294Z" fill="black"/>
                </svg>
            ),
            title: 'Начало',
            value: convertToMeetTime(meet.datetime),
        },
    ]

    return (
        <div style={{ position: "relative"}}>
            <img src={meet.image} className={classes.image}/>
            <div style={{ position: "absolute", top: 18, left: 16, right: 16 }}>
                {renderHeader && renderHeader()}
            </div>
            <div style={{ position: "relative"}}>
                <div className={classes.container}>
                    <Stack spacing={0} direction="row" justifyContent="space-between" alignContent="center">
                        <div style={{ fontSize: 23, lineHeight: '28px', letterSpacing: '-0.01em', fontWeight: 900 }}>
                            {meet.title}
                        </div>
                        <div onClick={() => getOnShare({
                            title: meet?.title,
                            url: `/meet/${meet?.id}`
                        })}>
                            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.8017 22.2773C11.4579 22.2773 11.8212 21.8438 11.8212 21.0352V14.3086C11.8212 11.4961 14.9384 7.41801 17.8212 5.57816L18.7587 4.96879C19.0868 4.76957 19.2626 4.40629 19.2626 4.05473C19.2626 3.48051 18.8642 3.08207 18.2665 3.08207C17.9736 3.08207 17.6572 3.18754 17.3759 3.37504L16.7548 3.7852C13.9072 5.68363 11.1767 9.28129 10.8134 11.0977H10.7783C10.415 9.26957 7.69622 5.68363 4.84856 3.7852L4.22747 3.37504C3.9345 3.18754 3.62981 3.08207 3.32513 3.08207C2.72747 3.08207 2.34075 3.51566 2.34075 4.04301C2.34075 4.39457 2.51653 4.76957 2.84466 4.96879L3.78216 5.57816C6.65325 7.41801 9.78216 11.4961 9.78216 14.3086V21.0352C9.78216 21.8438 10.1454 22.2773 10.8017 22.2773ZM2.73919 7.00785L6.02044 2.75395C6.52435 2.0977 6.20794 1.57035 5.42278 1.5352L0.864189 1.33598C0.207939 1.30082 -0.143624 1.73442 0.0555953 2.37895L1.40325 6.7266C1.63763 7.50004 2.22356 7.67582 2.73919 7.00785ZM18.7236 6.99613C19.2158 7.67582 19.8134 7.52348 20.0595 6.76176L21.5361 2.44926C21.747 1.81645 21.4072 1.37113 20.7626 1.38285L16.1923 1.45316C15.4072 1.46488 15.079 1.98051 15.5595 2.64848L18.7236 6.99613Z" fill="black"/>
                            </svg>
                        </div>
                    </Stack>
                    <div style={{ paddingTop: 24, color: '#070707', opacity: .6, fontSize: 13, lineHeight: '21px', letterSpacing: '0.025em'}}>
                        {meet.description}
                    </div>
                    {Boolean(meet.users.length) && (
                        <div style={{ paddingTop: 36}}>
                            <div style={{ color: '#070707', opacity: .4, fontSize: 13, lineHeight: '18px', letterSpacing: '0.05em' }}>
                                Участники
                            </div>
                            <Box sx={{ display: 'flex' }} style={{ paddingTop: 10}}>
                                <AvatarGroup max={4}>
                                    {meet.users.map((user) => (
                                        <Avatar alt={user.title} src={user.image} />
                                    ))}
                                </AvatarGroup>
                            </Box>
                        </div>
                    )}
                    <div id="parameters" style={{ paddingTop: 48}}>
                        <Stack spacing={3} direction="column">
                            {parameters.map(({ icon, title, value }, index) => (
                                <Grid container>
                                    <Grid xs={6}>
                                        <Stack spacing={2} direction="row" alignItems="center">
                                            {icon}
                                            <div style={{ fontSize: 13, fontWeight: 900, color: '#070707', letterSpacing: '0.025em' }}>
                                                {title}
                                            </div>
                                        </Stack>
                                    </Grid>
                                    <Grid xs={6}>
                                        <div style={{ fontSize: 13, color: '#070707', letterSpacing: '0.05em' }}>
                                            {value}
                                        </div>
                                    </Grid>
                                </Grid>
                            ))}
                        </Stack>
                    </div>
                    <div style={{ paddingTop: 20, marginLeft: -8, marginRight: -8 }}>
                        {renderFooter && renderFooter()}
                    </div>
                </div>
            </div>

        </div>
    );
}

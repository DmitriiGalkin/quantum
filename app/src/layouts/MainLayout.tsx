import {Outlet} from "react-router-dom";
import {Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Theme,} from "@mui/material";
import CreateMeet from "../view/CreateMeet";
import Options from "../view/Options";
import React, {useState} from "react";
import {makeStyles} from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "../components";
import {useAuth} from "../tools/auth";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
    },
    bottomNavigation: {
        backgroundColor: 'white',
        padding: '8px 0 6px',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
}));

export default function MainLayout(): JSX.Element {
    const { isAuth, openLogin } = useAuth();
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false)
    const [openMeet, setOpenMeet] = useState(false)
    const [openOptions, setOpenOptions] = useState(false)

    return (
        <>
            <Box className={classes.root}>
                <div style={{ position: 'fixed', zIndex: 10, left:0,right:0,top:0, padding: '15px 15px 14px 15px', background: 'linear-gradient(180deg, #FFB628 0%, #FF8F28 100%)' }}>
                    <Stack spacing={2} direction="row" justifyContent="space-between" style={{ width: '100%' }}>
                        <Stack spacing={4} direction="row" justifyContent="space-between" alignItems="center">
                            {isAuth && (
                                <div onClick={() => setOpenDrawer(true)}>
                                    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 2H22" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                                        <path d="M7 10L22 10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                                    </svg>
                                </div>
                            )}
                            <svg width="74" height="12" viewBox="0 0 74 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.2755 10.2915L10.4302 10.1526L10.2933 9.99617L9.27117 8.828C10.0366 7.98215 10.4842 6.86034 10.4842 5.58004C10.4842 2.83746 8.41974 0.789417 5.64313 0.789417C2.85427 0.789417 0.789417 2.83708 0.789417 5.58004C0.789417 8.323 2.85427 10.3707 5.64313 10.3707C6.64815 10.3707 7.55504 10.1068 8.31727 9.62943L9.35757 10.828L9.49795 10.9898L9.6573 10.8467L10.2755 10.2915ZM7.48029 8.67586C6.95091 8.98557 6.3227 9.15461 5.64313 9.15461C3.61497 9.15461 2.09379 7.64698 2.09379 5.58004C2.09379 3.5131 3.61497 2.00547 5.64313 2.00547C7.6582 2.00547 9.17985 3.51263 9.17985 5.58004C9.17985 6.47272 8.90422 7.25014 8.4292 7.8555L7.41706 6.691L7.27807 6.53108L7.11901 6.67105L6.48815 7.22621L6.3303 7.36512L6.46897 7.52318L7.48029 8.67586ZM13.1909 0.95344H12.9803V1.16402V6.67773C12.9803 8.85366 14.6043 10.3707 16.648 10.3707C18.6927 10.3707 20.303 8.85266 20.303 6.67773V1.16402V0.95344H20.0925H19.2471H19.0365V1.16402V6.70297C19.0365 8.1751 17.9714 9.15461 16.648 9.15461C15.3126 9.15461 14.2594 8.17576 14.2594 6.70297V1.16402V0.95344H14.0488H13.1909ZM30.4055 10.2066H30.6832L30.6083 9.93928L28.1354 1.10724L28.0923 0.95344H27.9326H24.7783H24.6186L24.5755 1.10724L22.1025 9.93928L22.0277 10.2066H22.3053H23.2011H23.3617L23.4042 10.0518L23.9674 7.99863H28.7552L29.3063 10.0507L29.3482 10.2066H29.5097H30.4055ZM39.617 0.95344H39.4064V1.16402V8.97797H39.1342L35.5313 1.07666L35.4752 0.95344H35.3397H33.2579H33.0473V1.16402V9.99605V10.2066H33.2579H34.1159H34.3265V9.99605V2.18211H34.6618L38.2646 10.0834L38.3208 10.2066H38.4562H40.4623H40.6729V9.99605V1.16402V0.95344H40.4623H39.617ZM43.0904 0.95344H42.8799V1.16402V1.97152V2.18211H43.0904H45.8575V9.99605V10.2066H46.0681H46.9261H47.1367V9.99605V2.18211H49.9037H50.1143V1.97152V1.16402V0.95344H49.9037H43.0904ZM52.3943 0.95344H52.1838V1.16402V6.67773C52.1838 8.85366 53.8078 10.3707 55.8514 10.3707C57.8961 10.3707 59.5065 8.85266 59.5065 6.67773V1.16402V0.95344H59.2959H58.4506H58.24V1.16402V6.70297C58.24 8.1751 57.1748 9.15461 55.8514 9.15461C54.5161 9.15461 53.4629 8.17576 53.4629 6.70297V1.16402V0.95344H53.2523H52.3943ZM73.0482 10.2066H73.2796L73.2578 9.97629L72.4251 1.14426L72.4071 0.95344H72.2154H70.1462H69.9903L69.9448 1.10258L67.5533 8.94294L65.1493 1.10229L65.1036 0.95344H64.9479H62.8787H62.6871L62.6691 1.14426L61.8363 9.97629L61.8146 10.2066H62.046H62.9292H63.1215L63.1389 10.0152L63.8533 2.18211H64.1126L66.6146 10.0598L66.6612 10.2066H66.8153H68.2663H68.4201L68.4669 10.0601L70.9814 2.18211H71.2409L71.9553 10.0152L71.9727 10.2066H72.165H73.0482ZM28.4142 6.78258H24.3099L25.5571 2.23258H27.1785L28.4142 6.78258Z" fill="white" stroke="white" strokeWidth="0.421166"/>
                            </svg>
                        </Stack>
                        {isAuth ? (
                            <div onClick={() => setOpenMeet(true)} style={{ display: 'flex' }}>
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.49642 12.4964H9.50358V20.5036C9.50358 21.3174 10.173 22 11 22C11.827 22 12.4964 21.3174 12.4964 20.5036V12.4964H20.5036C21.3174 12.4964 22 11.827 22 11C22 10.173 21.3174 9.50358 20.5036 9.50358H12.4964V1.49642C12.4964 0.682578 11.827 0 11 0C10.173 0 9.50358 0.682578 9.50358 1.49642V9.50358H1.49642C0.682578 9.50358 0 10.173 0 11C0 11.827 0.682578 12.4964 1.49642 12.4964Z" fill="white"/>
                                </svg>
                            </div>
                        ) : (
                            <div onClick={openLogin} style={{ color: 'white' }}>
                                Вход
                            </div>
                        )}
                    </Stack>
                </div>
                <div style={{minHeight: '100vh', height: '100%', position: 'absolute', left:0,right:0,top:0,bottom:0, backgroundColor: '#F5F5F5'}}>
                    <div style={{ padding: '77px 15px 77px', backgroundColor: '#F5F5F5' }}>
                        <Outlet />
                    </div>
                </div>
            </Box>
            <Drawer
                anchor='left'
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <div style={{ width: 250 }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setOpenOptions(true)}>
                                <ListItemIcon>
                                    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 2H22" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                                        <path d="M7 10L22 10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                                    </svg>
                                </ListItemIcon>
                                <ListItemText primary="Профиль" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <Dialog onClose={() => setOpenMeet(false)} open={openMeet} fullScreen TransitionComponent={TransitionDialog}>
                {openMeet && (
                    <CreateMeet onClose={() => setOpenMeet(false)} />)}
            </Dialog>
            <Dialog onClose={() => setOpenOptions(false)} open={openOptions} fullScreen TransitionComponent={TransitionDialog}>
                <Options onClose={() => {
                    setOpenOptions(false)
                    setOpenDrawer(false)
                }}/>
            </Dialog>
        </>
    )
};

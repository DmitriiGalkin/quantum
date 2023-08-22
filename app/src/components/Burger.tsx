import React from 'react';
import {Stack, SwipeableDrawer} from "@mui/material";
import {AppBanner} from "./AppBanner";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "./TransitionDialog";
import Profile from "../dialogs/Profile";
import UserMeets from "../dialogs/UserMeets";
import Projects from "../dialogs/Projects";
import {useToggle} from "usehooks-ts";
import {makeStyles} from "@mui/styles";
import {useAuth} from "../tools/auth";
import CreateProject from "../dialogs/CreateProject";

const useStyles = makeStyles(() => ({
    blockImage: {
        width: '100%',
        paddingTop: '100%',
        position: 'relative',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 100
    },
}));

export function Burger() {
    const classes = useStyles();

    const { user } = useAuth();

    const [profile, toggleProfile] = useToggle()
    const [menu, toggleMenu] = useToggle()
    const [userMeets, toggleUserMeets] = useToggle()
    const [projects, toggleProjects] = useToggle()
    const [project, toggleProject] = useToggle()

    if (!user) return null

    return (
        <div>
            <div onClick={toggleMenu} style={{ display: 'flex', zIndex: 1200 }}>
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2H2" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M17 10L2 10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
            </div>
            <SwipeableDrawer
                anchor="left"
                open={menu}
                onClose={toggleMenu}
                onOpen={toggleMenu}
            >
                <div style={{ padding: 15, color: 'black', height: '100%', width: 275 }}>
                    <Stack direction="column" justifyContent="space-between" style={{ height: '100%' }}>
                        <Stack spacing={2} direction="column">
                            <Stack spacing={3} direction="column" onClick={toggleProfile}>
                                <div style={{ padding: 14 }}>
                                    <Stack spacing={3} direction="row"  justifyContent="space-between" alignItems="center">
                                        <Stack spacing={2} direction="row">
                                            <div style={{ width: 72 }}>
                                                <div className={classes.blockImage}>
                                                    <img alt={user.title} src={user.image} className={classes.image}/>
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.18px' }}>Профиль</div>
                                                <div style={{ fontSize: 19, fontWeight: 600, lineHeight: '30px', letterSpacing: '0.193px' }}>{user.title}</div>
                                            </div>
                                        </Stack>
                                        <div>
                                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1L7 7" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                                                <path d="M7 7L1 13" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                        </div>
                                    </Stack>
                                </div>
                            </Stack>
                            <Stack spacing={1}>
                                {[
                                    {
                                        title: 'Посещения',
                                        icon: (
                                            <svg width="33" height="22" viewBox="0 0 33 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M24.4484 6.07871L24.4485 6.07877C24.7805 6.33869 25.1256 6.60883 25.5143 6.90972C23.7985 7.46376 22.6332 8.41721 21.9162 10.0278C21.1735 8.48163 20.0467 7.45087 18.2796 6.9226L18.3613 6.85809C18.9779 6.37146 19.4947 5.96362 20.0467 5.54396C19.2656 4.86108 18.7662 3.97205 18.8558 2.86398C18.9198 2.00071 19.2912 1.26629 19.9698 0.699374C21.2119 -0.344273 23.0814 -0.202543 24.1698 1.0086C25.1173 2.05225 25.4503 4.10089 23.7472 5.53108C23.9817 5.71337 24.2117 5.89344 24.4484 6.07871ZM3.72949 15.2981C1.46749 13.6718 1.80679 11.3186 3.13572 10.0742C4.62016 8.70661 7.20732 8.63269 8.77658 9.93867C10.572 11.4295 10.4448 13.3885 8.5221 15.1503C9.46932 15.9142 10.4165 16.6781 11.2931 17.3803L11.6241 17.1119C12.3663 16.5101 13.201 15.8333 14.0357 15.138C13.0602 14.448 12.4806 13.4624 12.5513 12.2057C12.6078 11.3063 13.0037 10.5424 13.7388 9.92635C15.3081 8.59573 17.867 8.64501 19.3797 10.0126C20.6804 11.1831 21.2034 13.4501 18.9839 15.1133C19.9311 15.8772 20.8924 16.6534 21.7548 17.3557C22.1169 17.0615 22.4977 16.7487 22.8926 16.4244L22.8927 16.4243C23.4072 16.0017 23.9456 15.5595 24.4975 15.1133C23.522 14.4111 22.8999 13.3885 23.013 12.1071C23.0979 11.1831 23.5503 10.3822 24.3844 9.76618C26.0243 8.54644 28.3712 8.64501 29.8556 10.0003C31.4955 11.4788 31.3259 13.3145 29.3608 15.1996C29.4956 15.2779 29.6332 15.3525 29.7705 15.4269C30.0653 15.5866 30.3586 15.7455 30.619 15.9388C31.9197 16.8629 32.6548 18.058 32.7255 19.5364C32.736 19.7695 32.7426 19.851 32.746 19.8933C32.7472 19.9081 32.748 19.9181 32.7485 19.9281C32.7494 19.9492 32.7488 19.9703 32.7469 20.0357C32.7453 20.0906 32.7429 20.1765 32.7396 20.3196C32.7255 20.9233 32.4427 21.1451 31.7359 21.1698H31.3824H1.58059C0.393043 21.1698 0.166843 20.9973 0.195118 19.9623C0.195822 19.9231 0.196455 19.8866 0.197046 19.8525C0.202351 19.5465 0.204264 19.4361 0.222904 19.3287C0.23342 19.268 0.24926 19.2083 0.274037 19.1149C0.298835 19.0215 0.332584 18.8943 0.378906 18.6986C0.788893 17.1093 1.96231 16.0004 3.72949 15.2981ZM13.3226 5.8871C13.181 5.77549 13.0393 5.66387 12.8952 5.55063C14.7007 3.94611 14.2013 1.95339 13.2794 0.95703C12.1525 -0.246365 10.2446 -0.324003 9.02818 0.775874C8.43917 1.31934 8.09344 1.99221 8.01661 2.79447C7.91417 3.94611 8.36234 4.86483 9.19465 5.56357C8.64262 5.98506 8.12584 6.39467 7.50922 6.88342L7.42759 6.94812C9.16904 7.43983 10.2959 8.46207 11.0513 10.0278C11.7812 8.42325 12.9464 7.46571 14.6623 6.93518C14.1725 6.55671 13.7476 6.22191 13.3226 5.8871Z" fill="#7139FF"/>
                                            </svg>
                                        ),
                                        onClick: toggleUserMeets },
                                    {
                                        title: 'Новый проект',
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="30" viewBox="0 0 33 30" fill="none">
                                                <rect x="0.192871" width="32.5561" height="30" rx="12" fill="#7139FF"/>
                                                <path d="M16.4709 8.5L16.4709 21.5" stroke="white" strokeWidth="1.73333" strokeLinecap="round"/>
                                                <path d="M9.41699 15.0002L23.5246 15.0002" stroke="white" strokeWidth="1.73333" strokeLinecap="round"/>
                                            </svg>
                                        ),
                                        onClick: toggleProject
                                    },
                                    {
                                        title: 'Проекты',
                                        icon: (
                                            <svg width="33" height="22" viewBox="0 0 33 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M24.4484 6.07871L24.4485 6.07877C24.7805 6.33869 25.1256 6.60883 25.5143 6.90972C23.7985 7.46376 22.6332 8.41721 21.9162 10.0278C21.1735 8.48163 20.0467 7.45087 18.2796 6.9226L18.3613 6.85809C18.9779 6.37146 19.4947 5.96362 20.0467 5.54396C19.2656 4.86108 18.7662 3.97205 18.8558 2.86398C18.9198 2.00071 19.2912 1.26629 19.9698 0.699374C21.2119 -0.344273 23.0814 -0.202543 24.1698 1.0086C25.1173 2.05225 25.4503 4.10089 23.7472 5.53108C23.9817 5.71337 24.2117 5.89344 24.4484 6.07871ZM3.72949 15.2981C1.46749 13.6718 1.80679 11.3186 3.13572 10.0742C4.62016 8.70661 7.20732 8.63269 8.77658 9.93867C10.572 11.4295 10.4448 13.3885 8.5221 15.1503C9.46932 15.9142 10.4165 16.6781 11.2931 17.3803L11.6241 17.1119C12.3663 16.5101 13.201 15.8333 14.0357 15.138C13.0602 14.448 12.4806 13.4624 12.5513 12.2057C12.6078 11.3063 13.0037 10.5424 13.7388 9.92635C15.3081 8.59573 17.867 8.64501 19.3797 10.0126C20.6804 11.1831 21.2034 13.4501 18.9839 15.1133C19.9311 15.8772 20.8924 16.6534 21.7548 17.3557C22.1169 17.0615 22.4977 16.7487 22.8926 16.4244L22.8927 16.4243C23.4072 16.0017 23.9456 15.5595 24.4975 15.1133C23.522 14.4111 22.8999 13.3885 23.013 12.1071C23.0979 11.1831 23.5503 10.3822 24.3844 9.76618C26.0243 8.54644 28.3712 8.64501 29.8556 10.0003C31.4955 11.4788 31.3259 13.3145 29.3608 15.1996C29.4956 15.2779 29.6332 15.3525 29.7705 15.4269C30.0653 15.5866 30.3586 15.7455 30.619 15.9388C31.9197 16.8629 32.6548 18.058 32.7255 19.5364C32.736 19.7695 32.7426 19.851 32.746 19.8933C32.7472 19.9081 32.748 19.9181 32.7485 19.9281C32.7494 19.9492 32.7488 19.9703 32.7469 20.0357C32.7453 20.0906 32.7429 20.1765 32.7396 20.3196C32.7255 20.9233 32.4427 21.1451 31.7359 21.1698H31.3824H1.58059C0.393043 21.1698 0.166843 20.9973 0.195118 19.9623C0.195822 19.9231 0.196455 19.8866 0.197046 19.8525C0.202351 19.5465 0.204264 19.4361 0.222904 19.3287C0.23342 19.268 0.24926 19.2083 0.274037 19.1149C0.298835 19.0215 0.332584 18.8943 0.378906 18.6986C0.788893 17.1093 1.96231 16.0004 3.72949 15.2981ZM13.3226 5.8871C13.181 5.77549 13.0393 5.66387 12.8952 5.55063C14.7007 3.94611 14.2013 1.95339 13.2794 0.95703C12.1525 -0.246365 10.2446 -0.324003 9.02818 0.775874C8.43917 1.31934 8.09344 1.99221 8.01661 2.79447C7.91417 3.94611 8.36234 4.86483 9.19465 5.56357C8.64262 5.98506 8.12584 6.39467 7.50922 6.88342L7.42759 6.94812C9.16904 7.43983 10.2959 8.46207 11.0513 10.0278C11.7812 8.42325 12.9464 7.46571 14.6623 6.93518C14.1725 6.55671 13.7476 6.22191 13.3226 5.8871Z" fill="#7139FF"/>
                                            </svg>
                                        ),
                                        onClick: toggleProjects
                                    }
                                ].map(({ title, icon, onClick }) => (
                                    <Stack key={title} spacing={3} direction="row" alignItems="center" style={{ backgroundColor: 'rgba(217, 217, 217, 0.4)', padding: '13px 15px', borderRadius: 20 }} onClick={onClick}>
                                        <div style={{ display: 'flex' }}>
                                            {icon}
                                        </div>
                                        <div style={{ flexGrow: 1, fontSize: 15, fontWeight: 500, lineHeight: '30px', letterSpacing: '0.15px' }}>{title}</div>
                                        <div style={{ display: 'flex' }}>
                                            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.12549 1L7.6367 7" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                                                <path d="M7.63672 7L1.12551 13" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                        </div>
                                    </Stack>
                                ))}
                            </Stack>
                        </Stack>
                        <AppBanner title="Установите приложение, пожалуйста"/>
                    </Stack>
                </div>
            </SwipeableDrawer>
            <Dialog onClose={toggleProfile} open={profile} fullScreen TransitionComponent={TransitionDialog}>
                <Profile onClose={toggleProfile} onLogout={toggleMenu} />
            </Dialog>
            <Dialog onClose={toggleUserMeets} open={userMeets} fullScreen TransitionComponent={TransitionDialog}>
                <UserMeets onClose={toggleUserMeets} />
            </Dialog>
            <Dialog onClose={toggleProjects} open={projects} fullScreen TransitionComponent={TransitionDialog}>
                <Projects onClose={toggleProjects} />
            </Dialog>
            <Dialog onClose={toggleProject} open={project} fullScreen TransitionComponent={TransitionDialog}>
                <CreateProject onClose={toggleProject} />
            </Dialog>
        </div>
    )
}
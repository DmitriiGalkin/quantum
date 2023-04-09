import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Theme,
    Toolbar,
    Typography
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import {useAddMeetUser, useAddProjectUser, useDeleteMeetUser, useDeleteProjectUser, useUser} from "../modules/user";
import {useProject} from "../modules/project";
import {getMeetsGroup} from "../tools/helper";
import Day from "../components/Day";
import {Meet, NewMeet} from "../modules/meet";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import QAvatar from "../components/QAvatar";
import {useNavigate, useParams} from "react-router-dom";
import CreateMeet from "../dialogs/CreateMeet";

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: `${theme.spacing(4)}px ${theme.spacing(4)}px 0 0`,
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
}));

// export interface ProjectDialogProps {
//     projectId?: number;
//     openProject: boolean
//     setOpenCreateMeet: (newMeet: NewMeet) => void
//     onClose: () => void;
// }
export default function Project() {
    const { id: projectId } = useParams();
    const { data: user } = useUser()
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { data: project, refetch } = useProject(Number(projectId))
    const active = user && project?.users.map(({ id}) => id).includes(user.id)

    const classes = useStyles();
    const [openCreateMeet, setOpenCreateMeet] = useState<NewMeet>()

    const addProjectUser = useAddProjectUser(project?.id)
    const deleteProjectUser = useDeleteProjectUser(project?.id)
    const addMeetUser = useAddMeetUser(Number(projectId))
    const deleteMeetUser = useDeleteMeetUser(Number(projectId))

    if (!project) { return null }

    const meetsGroup = getMeetsGroup(project?.meets)

    const handleProjectMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const onClick = () => {
        if (active) {
            deleteProjectUser.mutate({ projectId: project.id })
        } else {
            addProjectUser.mutate({ projectId: project.id })
        }
    }

    const onClickEnter = active ? ((meetId: number) => () => addMeetUser.mutate({ meetId })) : undefined
    const onClickLeave = active ? ((meetId: number) => () => deleteMeetUser.mutate({ meetId })) : undefined
    const onShare = async () => {
        try {
            await navigator.share({
                title: project?.title,
                text: project?.description,
                url: `https://selfproject.ru/project/${project?.id}`
            });
        }
        catch(e) {
            console.log('share error', e);
        }
    }

    return (
        <>
            <AppBar position="sticky">
                <Toolbar variant="dense">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => window.history.length ? window.history.back() : navigate('/')}
                    >
                        <ArrowBackIos style={{ color: 'white' }}/>
                    </IconButton>
                    <Typography variant="h6" color="white" component="div">
                        {project.title}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    {active && (
                        <IconButton size="large" edge="end" onClick={handleProjectMenuOpen}>
                            <MoreVertIcon style={{ color: 'white' }}/>
                        </IconButton>
                    )}
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        id={'primary-search-account-menu'}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => {
                            setOpenCreateMeet({ projectId: project?.id, activeStep: 1 })
                            handleMenuClose()
                        }}>Новая встреча</MenuItem>
                        <MenuItem onClick={onShare}>Поделиться</MenuItem>
                        <MenuItem onClick={() => onClick()}>Выйти из проекта</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <div className={classes.container}>
                <Container disableGutters sx={{ padding: '24px 18px' }}>
                    <Stack spacing={2}>
                        <Typography>
                            {project.description}
                        </Typography>
                        {!active && (
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<SaveIcon />}
                                onClick={onClick}
                            >
                                Участвовать в проекте
                            </Button>
                        )}
                        {Boolean(project.meets.length) && (
                            <div className={classes.block}>
                                <Typography variant="h5">
                                    Встречи
                                </Typography>
                                {meetsGroup.map(([date, meets]) => (
                                    <Day key={date} date={date} meets={meets as Meet[]} onClickEnter={onClickEnter} onClickLeave={onClickLeave}/>
                                ))}
                            </div>
                        )}
                        <div className={classes.block}>
                            <Typography variant="h5">
                                Участники
                            </Typography>
                            {project.users?.map((user) => (
                                <Box key={user.id} sx={{padding: 1, display: "flex"}}>
                                    <QAvatar {...user}/>
                                    <Box sx={{flexGrow:1, paddingLeft: 2}}>
                                        <Typography variant="subtitle1">
                                            {user.title}
                                        </Typography>
                                        <Typography>
                                            Вдохновитель
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </div>
                    </Stack>
                </Container>
            </div>
            <CreateMeet openCreateMeet={openCreateMeet} onClose={() => {
                setOpenCreateMeet(undefined)
                refetch()
            }} />
        </>
    );
}

import React from 'react';
import {makeStyles} from '@mui/styles';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton, Menu, MenuItem,
    Stack,
    Theme,
    Toolbar,
    Typography
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import PenIcon from "@mui/icons-material/Edit";
import {useNavigate} from "react-router-dom";
import {useAddProjectUser, useDeleteProjectUser} from "../modules/user";
import {useProject} from "../modules/project";
import {getMeetsGroup} from "../tools/helper";
import Day from "../components/Day";
import {Meet} from "../modules/meet";
import Dialog from "@mui/material/Dialog";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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

export interface ProjectDialogProps {
    projectId: number;
    active?: boolean
    setCreateMeet: (param: boolean) => void
    onClose: () => void;
}
export default function ProjectDialog({ projectId, active, setCreateMeet, onClose }: ProjectDialogProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const classes = useStyles();
    const navigate = useNavigate();

    const { data: project } = useProject(projectId)


    const addProjectUser = useAddProjectUser()
    const deleteProjectUser = useDeleteProjectUser()

    if (!project) { return null }

    const meetsGroup = getMeetsGroup(project.meets)

    const handleProjectMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const onClick = () => {
        if (active) {
            deleteProjectUser.mutate({ projectId })
        } else {
            addProjectUser.mutate({ projectId })
        }
    }

    return (
        <Dialog onClose={onClose} open={true} fullScreen>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={onClose}
                    >
                        <ArrowBackIos style={{ color: 'white' }}/>
                    </IconButton>
                    <Typography variant="h6" color="white" component="div">
                        {project.title}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    {active && (
                        <IconButton               size="large"
                                                  edge="end"
                                                  aria-label="account of current user"
                                                  aria-controls={'primary-search-account-menu'}
                                                  aria-haspopup="true"
                                                  onClick={handleProjectMenuOpen}
                                                  color="inherit">
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
                            setCreateMeet(true)
                            handleMenuClose()
                        }}>Новая встреча</MenuItem>
                        <MenuItem onClick={() => {
                            console.log('Редактирование проекта')
                            handleMenuClose()
                        }}>Редактировать</MenuItem>
                        <MenuItem onClick={() => {
                            onClick()
                            handleMenuClose()
                        }}>Выйти</MenuItem>
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
                        <div className={classes.block}>
                            <Typography variant="h5">
                                Встречи
                            </Typography>
                            {meetsGroup.map(([date, meets]) => (
                                <Day key={date} date={date} meets={meets as Meet[]}/>
                            ))}
                        </div>
                        <div className={classes.block}>
                            <Typography variant="h5">
                                Участники
                            </Typography>
                            {project.users?.map((user) => (
                                <Box key={user.id} sx={{padding: 1, display: "flex"}}>
                                    <Avatar
                                        alt={user.title}
                                        src={user.image}
                                        className={classes.large}
                                    />
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
        </Dialog>
    );
}

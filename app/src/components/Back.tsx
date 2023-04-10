import React from 'react';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import {AppBar, Box, IconButton, Menu, MenuItem, Skeleton, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface MenuItemProps {
    title: string,
    onClick: () => void
}
interface BackProps {
    title?: string
    onClick?: () => void
    menuItems?: MenuItemProps[]
}
export function Back({ title, onClick, menuItems }: BackProps) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const onBackClick = onClick ? onClick : (() => window.history.length ? window.history.back() : navigate('/'))
    const handleProjectMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton onClick={onBackClick} size="large" edge="start">
                    <BackIcon style={{ color: 'white' }}/>
                </IconButton>
                <Typography variant="h6" component="div" style={{ color: 'white', fontWeight: 'bold' }}>
                    {title || <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                {Boolean(menuItems?.length) && menuItems && (
                    <>
                        <IconButton size="large" edge="end" onClick={handleProjectMenuOpen}>
                            <MoreVertIcon style={{ color: 'white' }}/>
                        </IconButton>
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
                            {menuItems.map(({ title, onClick }) => {
                                const onClickWithClose = () => {
                                    onClick()
                                    handleMenuClose()
                                }
                                return <MenuItem onClick={onClickWithClose}>{title}</MenuItem>
                            })}
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>

    );
}

export default React.memo(Back);

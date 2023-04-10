import React from 'react';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import {AppBar, Box, IconButton, Menu, MenuItem, Skeleton, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface MenuItemProps {
    title: string,
    onClick: () => void
}
interface MoreProps {
    menuItems?: MenuItemProps[]
}
export function More({ menuItems }: MoreProps) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleProjectMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    if (!(Boolean(menuItems?.length) && menuItems)) { return null }

    return (
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
    )
}

export default React.memo(More);

import React from 'react';
import {Menu, MenuItem} from "@mui/material";

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
            <div onClick={handleProjectMenuOpen}>
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2H22" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M7 10L22 10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
            </div>
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
                    return <MenuItem key={title} onClick={onClickWithClose}>{title}</MenuItem>
                })}
            </Menu>
        </>
    )
}

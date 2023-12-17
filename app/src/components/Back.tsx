import React from 'react';
import {Menu, MenuItem, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Icon} from "./Icon";

export interface MenuItemProps {
    title: string,
    onClick: () => void
}
interface BackProps {
    onClick?: () => void
    menuItems?: MenuItemProps[]
}
export function Back({ onClick, menuItems }: BackProps) {
    const navigate = useNavigate();
    const onBackClick = onClick ? onClick : (() => (window.history.length - 1) ? window.history.back() : navigate('/'))
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleProjectMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{ position: "absolute", top: 18, left: 16, right: 16 }}>
            <Stack spacing={2} direction="row" justifyContent="space-between" style={{ width: '100%' }}>
                <div style={{ display: 'flex', padding: 7, background: '#FFFFFF', borderRadius: 18 }} onClick={onBackClick}>
                    <Icon name="left2"/>
                </div>
                {Boolean(menuItems?.length) && (
                    <div>
                        <div style={{ display: 'flex' }}>
                            <Icon onClick={handleProjectMenuOpen} name="dots"/>
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
                            {menuItems?.map(({ title, onClick }) => {
                                const onClickWithClose = () => {
                                    onClick()
                                    handleMenuClose()
                                }
                                return <MenuItem key={title} onClick={onClickWithClose}>{title}</MenuItem>
                            })}
                        </Menu>
                    </div>
                )}
            </Stack>
        </div>
    );
}

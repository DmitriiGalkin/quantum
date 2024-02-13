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
    const onClickBack = onClick ? onClick : (() => (window.history.length - 1) ? window.history.back() : navigate('/'))

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const onMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const onMenuClose = () => setAnchorEl(null)

    return (
        <Stack spacing={2} direction="row" justifyContent="space-between" style={{ width: '100%' }}>
                <div style={{ display: 'flex', padding: 7, background: '#FFFFFF', borderRadius: 18 }} onClick={onClickBack}>
                    <Icon name="left2"/>
                </div>
                {Boolean(menuItems?.length) && (
                    <div>
                        <div style={{ display: 'flex', padding: 7, background: 'rgba(0,0,0, .7)', borderRadius: 18 }} onClick={onMenuOpen}>
                            <Icon color="white" name="dots" onClick={onMenuOpen} />
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
                            open={Boolean(anchorEl)}
                            onClose={onMenuClose}
                        >
                            {menuItems?.map(({ title, onClick }) => {
                                const onClickWithClose = () => {
                                    onClick()
                                    onMenuClose()
                                }
                                return <MenuItem key={title} onClick={onClickWithClose}>{title}</MenuItem>
                            })}
                        </Menu>
                    </div>
                )}
            </Stack>
    );
}

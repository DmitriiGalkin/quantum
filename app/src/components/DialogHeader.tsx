import React from 'react';
import {useNavigate} from "react-router-dom";
import {Header} from "./Header";
import {Icon} from "./Icon";
import Typography from "./Typography";
import {MenuItemProps} from "./Back";
import {Menu, MenuItem} from "@mui/material";

interface DialogHeaderProps {
    title?: string
    onClick?: () => void
    onClickOption?: () => void
    isClose?: boolean
    menuItems?: MenuItemProps[]
}
export function DialogHeaderDefault({ title, onClick, onClickOption, isClose, menuItems }: DialogHeaderProps) {
    const navigate = useNavigate();
    const onBackClick = onClick ? onClick : (() => (window.history.length - 1) ? window.history.back() : navigate('/'))

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const onMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const onMenuClose = () => setAnchorEl(null)

    return (
        <Header>
            {!isClose && <Icon name="left" onClick={onBackClick} />}
            <Typography variant="Header1" style={{ flexGrow: 1, color: 'white', textAlign: 'center', paddingLeft: isClose ? 36 : undefined, paddingRight: !isClose ? 36 : undefined }}>{title}</Typography>
            {isClose && <Icon name="close" onClick={onBackClick} />}
            {onClickOption && <Icon name="option" onClick={onClickOption} />}
            {Boolean(menuItems?.length) && (
                <div>
                    <div onClick={onMenuOpen}>
                        <Icon name="dots" onClick={onMenuOpen} />
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
        </Header>
    );
}

export const DialogHeader = React.memo(DialogHeaderDefault);

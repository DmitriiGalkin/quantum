import { Menu, MenuItem } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { MenuItemProps } from './Back'
import { Header } from './Header'
import { Icon } from './Icon'
import Typography from './Typography'

interface DialogHeaderProps {
  title?: string
  onClick?: () => void
  onClickOption?: () => void
  isClose?: boolean
  menuItems?: MenuItemProps[]
  isForPassport?: boolean
}
export function DialogHeaderDefault({
  title,
  onClick,
  onClickOption,
  isClose,
  menuItems,
  isForPassport,
}: DialogHeaderProps): JSX.Element {
  const navigate = useNavigate()
  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null)

  const onBackClick = onClick ? onClick : () => (window.history.length - 1 ? navigate(-1) : navigate('/'))
  const onMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorElement(event.currentTarget)
  const onMenuClose = () => setAnchorElement(null)

  return (
    <Header isForPassport={isForPassport}>
      {!isClose && <Icon color="white" name="left" onClick={onBackClick} />}
      <Typography
        variant="Header1"
        style={{
          flexGrow: 1,
          color: 'white',
          textAlign: 'center',
          paddingLeft: isClose ? 36 : undefined,
          paddingRight: !isClose ? 36 : undefined,
        }}
      >
        {title}
      </Typography>
      {isClose && <Icon color="white" name="close" onClick={onBackClick} />}
      {onClickOption && <Icon color="white" name="option" onClick={onClickOption} />}
      {Boolean(menuItems?.length) && (
        <div>
          <div onClick={onMenuOpen}>
            <Icon color="white" name="dots" onClick={onMenuOpen} />
          </div>
          <Menu
            anchorEl={anchorElement}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            id="primary-search-account-menu"
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElement)}
            onClose={onMenuClose}
          >
            {menuItems?.map(({ title, onClick }) => {
              const onClickWithClose = () => {
                onClick()
                onMenuClose()
              }
              return (
                <MenuItem key={title} onClick={onClickWithClose}>
                  {title}
                </MenuItem>
              )
            })}
          </Menu>
        </div>
      )}
    </Header>
  )
}

export const DialogHeader = DialogHeaderDefault

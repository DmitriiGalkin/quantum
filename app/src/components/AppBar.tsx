import { Avatar, Stack, SwipeableDrawer } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useToggle } from 'usehooks-ts'

import { useAuth } from '../tools/auth'
import { COLOR_LOW } from '../tools/theme'
import { Button } from './Button'
import { Header } from './Header'
import { Icon } from './Icon'
import { LeftButton } from './LeftButton'
import { Logo } from './Logo'
import Typography from './Typography'

export function AppBar({ isIdeasTab }: { isIdeasTab?: boolean }): React.ReactElement {
  const navigate = useNavigate()
  const [menu, toggleMenu] = useToggle()
  const [sub, toggleSub] = useToggle()
  const { isAuth, openLogin, user, passport, setSelectedUserId } = useAuth()

  return isAuth ? (
    <>
      <Header>
        {user && (
          <>
            <Stack direction="row" spacing={2} alignItems="center" onClick={toggleMenu}>
              <Avatar alt={user.title} src={user.image} sx={{ border: '2px solid white' }} />
              <Typography variant="Body-Bold" style={{ color: 'white' }}>
                {user.title}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Icon
                color="white"
                name="like"
                onClick={() => navigate((isIdeasTab ? '/ideas' : '/projects') + '/search')}
              />
              <Icon color="white" name="meets" onClick={() => navigate('/meets')} />
            </Stack>
          </>
        )}
        {passport && !user && (
          <>
            <Stack direction="row" spacing={2} alignItems="center" onClick={toggleMenu}>
              <Stack>
                <Typography variant="Body-Bold" style={{ color: 'white' }}>
                  {passport.title}
                </Typography>
              </Stack>
            </Stack>
            <Icon color="white" name="meets" onClick={() => navigate('/meets/isForPassport')} />
          </>
        )}
      </Header>
      <SwipeableDrawer anchor="left" open={menu} onClose={toggleMenu} onOpen={toggleMenu}>
        <Stack direction="row" style={{ height: '100%' }}>
          {sub && (
            <div style={{ backgroundColor: COLOR_LOW, width: 60, padding: '24px 8px', height: '100%' }}>
              <Stack alignItems="center" spacing={2}>
                {passport?.users.map((user) => (
                  <Avatar
                    key={user.id}
                    alt={user.title}
                    src={user.image}
                    sx={{ border: '2px solid white' }}
                    onClick={() => setSelectedUserId(user.id)}
                  />
                ))}
              </Stack>
            </div>
          )}
          <div style={{ color: 'black', height: '100%', width: 280 }}>
            <Stack justifyContent="space-between" style={{ height: '100%', position: 'relative' }}>
              {user && (
                <>
                  <LeftButton onClick={toggleSub} iconName="users" />
                  <Stack spacing={2} style={{ backgroundColor: 'white', padding: 16 }}>
                    <Stack
                      spacing={2}
                      direction="row"
                      style={{ padding: '14px 40px' }}
                      onClick={() => navigate(`/user/${user?.id}/edit`)}
                    >
                      <Avatar alt={user.title} src={user.image} sx={{ width: 72, height: 72 }} />
                      <Stack>
                        <Typography variant="Caption">Ребенок</Typography>
                        <Typography variant="Header3">{user.title}</Typography>
                      </Stack>
                    </Stack>
                    <Stack spacing={1}>
                      <Button
                        variant="menuButton"
                        icon={<Icon name="add" color="white" />}
                        onClick={() => navigate('/idea')}
                        color="primary"
                      >
                        Воплотить идею
                      </Button>
                      <Button variant="menuButton" icon={<Icon name="visits" />} onClick={() => navigate('/visits')}>
                        Посещения
                      </Button>
                    </Stack>
                  </Stack>
                </>
              )}
              {passport && (
                <>
                  {!user && <LeftButton onClick={() => navigate('/user')} iconName="addUser" />}
                  <Stack spacing={1} style={{ padding: 16 }}>
                    <Stack style={{ padding: '14px 40px' }} onClick={() => navigate('/passport')}>
                      <Typography variant="Caption">Взрослый</Typography>
                      <Typography variant="Header3">{passport.title}</Typography>
                    </Stack>
                    <Button
                      variant="menuButton"
                      icon={<Icon name="add" color="white" />}
                      onClick={() => navigate('/project')}
                      color="primary"
                    >
                      Организовать проект
                    </Button>
                    <Button
                      variant="menuButton"
                      icon={<Icon name="passport" />}
                      onClick={() => navigate('/projects/self')}
                    >
                      Организую проекты
                    </Button>
                    <Button
                      variant="menuButton"
                      icon={<Icon name="passport" />}
                      onClick={() => navigate('/meets/isForPassport')}
                    >
                      Календарь организатора
                    </Button>
                  </Stack>
                </>
              )}
            </Stack>
          </div>
        </Stack>
      </SwipeableDrawer>
    </>
  ) : (
    <Header>
      <Logo />
      <Stack direction="row" spacing={1}>
        <Icon
          color="white"
          name="like"
          onClick={() => navigate((isIdeasTab ? '/ideas' : '/projects') + '/search')}
        />
        <Icon color="white" name="login" onClick={openLogin} />
      </Stack>
    </Header>
  )
}

export default AppBar

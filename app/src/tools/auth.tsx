import { Avatar, Box, Stack, SwipeableDrawer } from '@mui/material'
import React, { createContext, useContext } from 'react'
import { useNavigate, useOutlet, useSearchParams } from 'react-router-dom'
import { useLocalStorage, useToggle } from 'usehooks-ts'

import { Button, Icon } from '../components'
import { Header } from '../components/Header'
import { LeftButton } from '../components/LeftButton'
import { Logo } from '../components/Logo'
import Typography from '../components/Typography'
import Login from '../dialogs/Login'
import { Passport, User } from './dto'
import service, { usePassport } from './service'
import { COLOR_LOW, COLOR_PAPER } from './theme'

export const ACCESS_TOKEN = 'access_token'
export const AuthContext = createContext<Auth>({
  openLogin: () => true,
  logout: () => true,
  refetch: () => true,
  setSelectedUserId: () => true,
})

export const AuthProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const navigate = useNavigate()
  const [menu, toggleMenu] = useToggle()
  const [sub, toggleSub] = useToggle()
  const isIdeasTab = true

  const { data: passport, refetch } = usePassport()
  const [searchParams] = useSearchParams()
  const tokenSearchParam = searchParams.get('access_token')
  const accessToken = localStorage.getItem(ACCESS_TOKEN) || tokenSearchParam
  const [openLogin, toggleOpenLogin] = useToggle()
  const isAuth = Boolean(accessToken)
  const [selectedUserId, setSelectedUserId] = useLocalStorage('selectedUserId', 0)

  if (tokenSearchParam) {
    localStorage.setItem(ACCESS_TOKEN, tokenSearchParam)
  }

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    service.interceptors.request.use((config) => {
      config.headers.Authorization = undefined
      return config
    })
    navigate('/', { replace: true })
  }

  const user = passport?.users.length
    ? passport?.users.find((u) => u.id === selectedUserId) || passport?.users[0]
    : undefined

  console.log(isAuth, 'isAuth')
  return (
    <AuthContext.Provider
      value={{
        user,
        passport,
        isAuth,
        openLogin: toggleOpenLogin,
        // access_token: accessToken,
        logout,
        setSelectedUserId,
        refetch,
      }}
    >
      <Box style={{ backgroundColor: COLOR_PAPER, display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {isAuth ? (
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
                            <Stack spacing={1} direction="row" justifyContent="space-between">
                              <Button
                                variant="menuButton"
                                icon={<Icon name="add" color="white" />}
                                onClick={() => navigate('/idea')}
                                color="primary"
                              >
                                Создать идею
                              </Button>
                            </Stack>
                            <Button
                              variant="menuButton"
                              icon={<Icon name="visits" />}
                              onClick={() => navigate('/visits')}
                            >
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
                          <Stack style={{ padding: '14px 40px' }} onClick={() => navigate('passport')}>
                            <Typography variant="Caption">Взрослый</Typography>
                            <Typography variant="Header3">{passport.title}</Typography>
                          </Stack>
                          <Stack spacing={1} direction="row" justifyContent="space-between">
                            <Button
                              variant="menuButton"
                              icon={<Icon name="add" color="white" />}
                              onClick={() => navigate('/project')}
                              color="primary"
                            >
                              Создать проект
                            </Button>
                          </Stack>
                          <Button
                            variant="menuButton"
                            icon={<Icon name="passport" />}
                            onClick={() => navigate('/projects/self')}
                          >
                            Мои проекты
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
            <Icon color="white" name="login" onClick={toggleOpenLogin} />
          </Header>
        )}
        {children}
      </Box>
      <Login open={openLogin} onClose={toggleOpenLogin} />
    </AuthContext.Provider>
  )
}

export interface Auth {
  user?: User
  passport?: Passport
  isAuth?: boolean
  openLogin: () => void
  logout: () => void
  refetch: () => void
  setSelectedUserId: (userId: number) => void
}

export const useAuth = (): Auth => {
  return useContext(AuthContext)
}

export const AuthLayout = (): JSX.Element => {
  const outlet = useOutlet()
  return <AuthProvider>{outlet as JSX.Element}</AuthProvider>
}

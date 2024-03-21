import { Avatar, Box, Stack, SwipeableDrawer } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToggle } from 'usehooks-ts'

import { IdeaCard } from './cards/IdeaCard'
import { ProjectCard } from './cards/ProjectCard'
import { Button, DialogFooter, Icon } from './components'
import { DialogContent } from './components/DialogContent'
import { Header } from './components/Header'
import { LeftButton } from './components/LeftButton'
import { Logo } from './components/Logo'
import { RecommendationIdeas } from './components/RecommendationIdeas'
import { RecommendationProjects } from './components/RecommendationProjects'
import Typography from './components/Typography'
import FastProject from './dialogs/FastProject'
import { useAuth } from './tools/auth'
import { useIdeas, useProjects } from './tools/service'
import { COLOR, COLOR_GRAY, COLOR_LOW, COLOR_PAPER } from './tools/theme'

function App(): JSX.Element {
  const navigate = useNavigate()
  const { isAuth, openLogin, user, setSelectedUserId, passport } = useAuth()
  const [fastProject, toggleFastProject] = useToggle()
  const [menu, toggleMenu] = useToggle()
  const [sub, toggleSub] = useToggle()

  const { data: selfIdeas = [], refetch } = useIdeas({ variant: 'self', userId: user?.id })
  const { data: userProjects = [] } = useProjects({ variant: 'participation', userId: user?.id })
  // useFast(refetchSelfProjects)

  const [bottomNavigationValue, setBottomNavigationValue] = useState(1)
  const isProjectsTab = bottomNavigationValue === 1
  const isIdeasTab = bottomNavigationValue === 0

  return (
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
                  <Icon color="white" name="like" onClick={() => navigate(isIdeasTab ? '/ideas' : '/projects')} />
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
          <Icon color="white" name="login" onClick={openLogin} />
        </Header>
      )}
      <DialogContent>
        {isProjectsTab && (
          <Stack spacing={4} style={{ padding: 16 }}>
            {userProjects.length ? (
              <Stack spacing={2}>
                <Typography variant="Header2">{user?.title} участвует в проектах</Typography>
                <Stack spacing={1}>
                  {userProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      //refetchParent={refetchSelfProjects}
                      variant="self"
                    />
                  ))}
                </Stack>
              </Stack>
            ) : (
              <Stack spacing={3}>
                <img src="/forTeacher.svg" style={{ width: '100%' }} />
                <Button onClick={() => navigate('/project')}>Создать свой проект</Button>
              </Stack>
            )}
            <RecommendationProjects />
          </Stack>
        )}
        {isIdeasTab && (
          <Stack spacing={4} style={{ padding: 16 }}>
            {selfIdeas.length ? (
              <Stack spacing={2}>
                <Stack spacing={2}>
                  <Typography variant="Header2">Мои идеи</Typography>
                  <Stack spacing={2}>
                    {selfIdeas?.map((idea) => (
                      <IdeaCard key={idea.id} idea={idea} refetch={refetch} />
                    ))}
                  </Stack>
                </Stack>
                <Button onClick={() => navigate('/idea')}>Создать идею</Button>
              </Stack>
            ) : (
              <Stack spacing={3}>
                <img src="/forParent.svg" style={{ width: '100%' }} />
                <Button onClick={() => navigate('/idea')}>Создать идею проекта</Button>
              </Stack>
            )}
            <RecommendationIdeas />
          </Stack>
        )}
      </DialogContent>
      <DialogFooter>
        <Stack spacing={2} direction="row" justifyContent="space-evenly">
          <Stack spacing={2} direction="row" alignItems="center" onClick={() => setBottomNavigationValue(1)}>
            <Icon name="project" color={isProjectsTab ? 'secondary' : 'gray'} />
            <span
              style={{
                fontSize: 9,
                fontWeight: 900,
                textTransform: 'uppercase',
                color: isProjectsTab ? COLOR : COLOR_GRAY,
              }}
            >
              Проекты
            </span>
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center" onClick={() => setBottomNavigationValue(0)}>
            <Icon name="idea" color={isIdeasTab ? 'secondary' : 'gray'} />
            <span
              style={{
                fontSize: 9,
                fontWeight: 900,
                textTransform: 'uppercase',
                color: isIdeasTab ? COLOR : COLOR_GRAY,
              }}
            >
              Идеи
            </span>
          </Stack>
        </Stack>
      </DialogFooter>
      <FastProject open={fastProject} onClose={toggleFastProject} />
    </Box>
  )
}

export default App

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { YMaps } from '@pbe/react-yandex-maps'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route } from 'react-router'
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import EditIdea from './dialogs/EditIdea'
import EditMeet from './dialogs/EditMeet'
import EditProject from './dialogs/EditProject'
import EditUser from './dialogs/EditUser'
import Ideas from './dialogs/Ideas'
import Meets from './dialogs/Meets'
import PassportDialog from './dialogs/Passport'
import ProjectDialog from './dialogs/ProjectDialog'
import Projects from './dialogs/Projects'
import SearchProjects from './dialogs/SearchProjects'
import SelfProjects from './dialogs/SelfProjects'
import Visits from './dialogs/Visits'
import { AuthLayout } from './tools/auth'
import reportWebVitals from './tools/reportWebVitals'
import theme from './tools/theme'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />}>
      <Route index element={<Projects />} />
      <Route path="projects/self" element={<SelfProjects open={true} />} />
      <Route path="projects/search" element={<SearchProjects open={true} />} />
      <Route path="projects" element={<Projects />} />
      <Route path="project" element={<EditProject open={true} />} />
      <Route path="project/:id" element={<ProjectDialog open={true} />} />
      <Route path="project/:id/edit" element={<EditProject open={true} />} />
      <Route path="passport" element={<PassportDialog open={true} />} />
      <Route path="user" element={<EditUser open={true} />} />
      <Route path="user/:id/edit" element={<EditUser open={true} />} />
      <Route path="ideas" element={<Ideas />} />
      <Route path="idea" element={<EditIdea open={true} />} />
      <Route path="idea/:id/edit" element={<EditIdea open={true} />} />
      <Route path="visits" element={<Visits open={true} />} />
      <Route path="meets" element={<Meets open={true} />} />
      <Route path="meets/isForPassport" element={<Meets open={true} isForPassport />} />
      <Route path="meet" element={<EditMeet open={true} />} />
      <Route path="meet/:id/edit" element={<EditMeet open={true} />} />
    </Route>,
  ),
)

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement)

const queryClient = new QueryClient()

root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <YMaps>
        <RouterProvider router={router} />
      </YMaps>
    </ThemeProvider>
  </QueryClientProvider>,
  // </React.StrictMode>
)

reportWebVitals()

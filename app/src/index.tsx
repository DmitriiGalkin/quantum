import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { YMaps } from '@pbe/react-yandex-maps'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'dayjs/locale/ru'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route } from 'react-router'
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import App from './App'
import { AuthLayout } from './tools/auth'
import reportWebVitals from './tools/reportWebVitals'
import theme from './tools/theme'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />}>
      <Route index element={<App />} />
      <Route path="i" element={<App action="fastIdea" />} />
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

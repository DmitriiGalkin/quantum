import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './tools/reportWebVitals';
import {createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers';
import theme from "./tools/theme";
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import {GoogleOAuthProvider} from '@react-oauth/google';
import 'dayjs/locale/ru';
import {Route} from "react-router";
import {AuthLayout} from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Callback from "./pages/Callback";
import {ProtectedLayout} from "./layouts/ProtectedLayout";
import {MainLayout} from "./layouts/MainLayout";
import Meets from "./pages/Meets";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Uniques from "./pages/Uniques";
import ProjectDialog from "./pages/Project";
import PlaceDialog from "./pages/Place";

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/callback" element={<Callback />} />
            <Route element={<ProtectedLayout />}>
                <Route element={<MainLayout />}>
                    <Route index element={<Meets />}/>
                    <Route path="/projects" element={<Projects />}/>
                    <Route path="/tasks" element={<Tasks />}/>
                    <Route path="/uniques" element={<Uniques />}/>
                </Route>
                <Route path="/project/:id" element={<ProjectDialog />}/>
                <Route path="/place/:id" element={<PlaceDialog />}/>
            </Route>
        </Route>
    )
);

root.render(
    <GoogleOAuthProvider clientId="804980223837-9e350rj8p8glgbqel5c5rmh6jafnf1u2.apps.googleusercontent.com">

  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
              <CssBaseline />
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                  <RouterProvider router={router} />
              </LocalizationProvider>
          </QueryClientProvider>
      </ThemeProvider>
  </React.StrictMode>
    </GoogleOAuthProvider>,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

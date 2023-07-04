import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './tools/reportWebVitals';
import {createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import theme from "./tools/theme";
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import {GoogleOAuthProvider} from '@react-oauth/google';
import 'dayjs/locale/ru';
import {Route} from "react-router";
import {AuthLayout} from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Callback from "./pages/Callback";
import {ProfileLayout} from "./layouts/ProfileLayout";
import {MainLayout} from "./layouts/MainLayout";
import Meets from "./pages/Meets";
import Meet from "./pages/Meet";

import {GOOGLE_O_AUTH_PROVIDER_CLIENT_ID} from "./tools/auth";

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/callback" element={<Callback />} />
            <Route element={<ProfileLayout />}>
                <Route element={<MainLayout />}>
                    <Route index element={<Meets />}/>
                </Route>
                <Route path="/meet/:id" element={<Meet />}/>
            </Route>
        </Route>
    )
);

root.render(
    <GoogleOAuthProvider clientId={GOOGLE_O_AUTH_PROVIDER_CLIENT_ID}>
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

reportWebVitals();

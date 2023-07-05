import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './tools/reportWebVitals';
import {RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import theme from "./tools/theme";
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import {GoogleOAuthProvider} from '@react-oauth/google';
import 'dayjs/locale/ru';

import {GOOGLE_O_AUTH_PROVIDER_CLIENT_ID} from "./tools/auth";
import {router} from "./router";

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
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

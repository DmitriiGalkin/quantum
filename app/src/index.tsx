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
import 'dayjs/locale/ru';

import {router} from "./router";
import {YMaps} from "@pbe/react-yandex-maps";

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
              <CssBaseline />
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                  <YMaps>
                    <RouterProvider router={router} />
                  </YMaps>
              </LocalizationProvider>
          </QueryClientProvider>
      </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();

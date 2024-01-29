import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './tools/reportWebVitals';
import {RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from "@mui/material/styles";
import theme from "./tools/theme";

import 'dayjs/locale/ru';

import {router} from "./router";
import {YMaps} from "@pbe/react-yandex-maps";

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <YMaps>
                  <RouterProvider router={router} />
              </YMaps>
          </ThemeProvider>
      </QueryClientProvider>
  // </React.StrictMode>
);

reportWebVitals();

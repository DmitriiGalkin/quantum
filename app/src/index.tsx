import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './tools/reportWebVitals';
import {RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import CssBaseline from '@mui/material/CssBaseline';
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
          <CssBaseline />
          <YMaps>
            <RouterProvider router={router} />
          </YMaps>
      </QueryClientProvider>
  // </React.StrictMode>
);

reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './tools/reportWebVitals';
import {createBrowserRouter, createRoutesFromElements, RouterProvider, useOutlet} from "react-router-dom";
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from "@mui/material/styles";
import theme from "./tools/theme";

import 'dayjs/locale/ru';

import {YMaps} from "@pbe/react-yandex-maps";
import {AuthLayout} from "./tools/auth";
import {Route} from "react-router";
import App from "./App";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthLayout />}>
            <Route index element={<App />}/>
            <Route path={"i"} element={<App action={'fastIdea'} />}/>
        </Route>
    )
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

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
      </QueryClientProvider>
  // </React.StrictMode>
);

reportWebVitals();

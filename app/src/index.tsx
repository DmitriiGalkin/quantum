import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {router} from "./App";
import theme from "./theme";
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import { GoogleOAuthProvider } from '@react-oauth/google';


const queryClient = new QueryClient()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
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

import React from 'react';
import {Route} from "react-router";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Callback from "./pages/Callback";
import CreateUser from "./pages/CreateUser";
import CreatePlace from "./pages/CreatePlace";

import {ProtectedLayout} from "./layouts/ProtectedLayout";
import {createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import {AuthLayout} from "./layouts/AuthLayout";
import Main from './pages/Main'
import './App.css'

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/callback" element={<Callback />} />
            <Route element={<ProtectedLayout />}>
                <Route index element={<Main />}/>
                <Route path="user/:id/edit" element={<CreateUser isEdit />} />
                <Route path="place" element={<CreatePlace />} />
            </Route>
        </Route>
    )
);

import React from 'react';
import {Route} from "react-router";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Callback from "./pages/Callback";

import {ProtectedLayout} from "./layouts/ProtectedLayout";
import {MainLayout} from "./layouts/MainLayout";

import {createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import {AuthLayout} from "./layouts/AuthLayout";
import Main from './pages/Main'
import './App.css'
import ProjectDialog from "./pages/Project";
import Meets from "./pages/Meets";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Uniques from "./pages/Uniques";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/callback" element={<Callback />} />
            <Route element={<ProtectedLayout />}>
                <Route index element={<Main />}/>
                <Route element={<MainLayout />}>
                    <Route path="/meets" element={<Meets />}/>
                    <Route path="/projects" element={<Projects />}/>
                    <Route path="/tasks" element={<Tasks />}/>
                    <Route path="/uniques" element={<Uniques />}/>
                    <Route path="/project/:id" element={<ProjectDialog />}/>
                </Route>
            </Route>
        </Route>
    )
);

import React from 'react';
import {Route} from "react-router";
import Project from "./pages/Project";
import Map from "./pages/Map";
import Task from "./pages/task";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Callback from "./pages/Callback";
import CreateMeet from "./pages/createMeet";
import CreateUser from "./pages/CreateUser";
import CreateProject from "./pages/CreateProject";
import CreatePlace from "./pages/CreatePlace";
import Meets from "./pages/Meets";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Uniques from "./pages/Uniques";
import Place from "./pages/Place";

import {ProtectedLayout} from "./layouts/ProtectedLayout";
import {createBrowserRouter, createRoutesFromElements, defer} from "react-router-dom";
import {AuthLayout} from "./layouts/AuthLayout";
import MainLayout from './layouts/MainLayout'
import './App.css'

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/callback" element={<Callback />} />
            <Route element={<ProtectedLayout />}>
                <Route element={<MainLayout />}>
                    <Route index element={<Meets />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="uniques" element={<Uniques />} />
                </Route>
                <Route path="meet" element={<CreateMeet />} />
                <Route path="map" element={<Map />} />
                <Route path="project" element={<CreateProject />} />
                <Route path="project/:id/edit" element={<CreateProject isEdit />} />
                <Route path="project/:id" element={<Project />} />
                <Route path="user/:id/edit" element={<CreateUser isEdit />} />
                <Route path="place" element={<CreatePlace />} />
                <Route path="task/:id" element={<Task />} />
                <Route path="place/:id" element={<Place />} />
            </Route>
        </Route>
    )
);

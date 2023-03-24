import React from 'react';
import {Route} from "react-router";
import Main from "./pages/Main";
import {createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import MainLayout from './layouts/MainLayout'
import './App.css'
import ForUserPage from "./pages/ForUser";
import ForPlacePage from "./pages/ForPlace";
import ForMasterPage from "./pages/ForMaster";
import ProfilePlacesPage from "./pages/ProfilePlacesPage";

const getUserData = () =>
    new Promise((resolve) =>
        setTimeout(() => {
            const user = window.localStorage.getItem("user");
            resolve(user);
        }, 10)
    );
export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<MainLayout />}>
            <Route index element={<Main />} />
            <Route path="for-user" element={<ForUserPage />} />
            <Route path="for-master" element={<ForMasterPage />} />
            <Route path="for-place" element={<ForPlacePage />} />
            <Route path="profile/places" element={<ProfilePlacesPage />} />
        </Route>
    )
);

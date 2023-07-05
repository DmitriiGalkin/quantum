import React from "react";
import {createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import { Route } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Callback from "./view/Callback";
import MeetsView from "./view/MeetsView";
import MeetView from "./view/MeetView";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthLayout />}>
            <Route path="/callback" element={<Callback />} />
            <Route element={<MainLayout />}>
                <Route index element={<MeetsView />}/>
            </Route>
            <Route path="/meet/:id" element={<MeetView />}/>
        </Route>
    )
);
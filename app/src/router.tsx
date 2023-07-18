import React from "react";
import {createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import {Route} from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import MeetsView from "./view/MeetsView";
import MeetView from "./view/MeetView";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthLayout />}>
            <Route index element={<MeetsView />}/>
            <Route path="/meet/:id" element={<MeetView />}/>
        </Route>
    )
);
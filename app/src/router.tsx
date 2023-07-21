import React from "react";
import {createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import {Route} from "react-router";
import MainView from "./view/MainView";
import MeetView from "./view/MeetView";
import {useOutlet} from "react-router-dom";
import {AuthProvider} from "./tools/auth";

export default function AuthLayout(): JSX.Element {
    const outlet = useOutlet();
    return (
        <AuthProvider>{outlet as JSX.Element}</AuthProvider>
    );
};

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthLayout />}>
            <Route index element={<MainView />}/>
            <Route path="/meet/:id" element={<MeetView />}/>
        </Route>
    )
);
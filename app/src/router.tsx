import React from "react";
import {createBrowserRouter, createRoutesFromElements, useOutlet} from "react-router-dom";
import {Route} from "react-router";
import MainView from "./views/MainView";
import MeetView from "./views/MeetView";
import Meets from "./views/Meets";
import Projects from "./views/Projects";
import ProjectView from "./views/ProjectView";
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
            <Route element={<MainView />}>
                <Route index element={<Meets />}/>
                <Route path="/projects" element={<Projects />}/>
            </Route>
            <Route path="/meet/:id" element={<MeetView />}/>
            <Route path="/project/:id" element={<ProjectView />}/>
        </Route>
    )
);
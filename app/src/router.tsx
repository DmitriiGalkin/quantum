import React from "react";
import {createBrowserRouter, createRoutesFromElements, useOutlet} from "react-router-dom";
import {Route} from "react-router";
import ProjectsView from "./views/ProjectsView";
import ProjectView from "./dialogs/ProjectView";
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
            <Route index element={<ProjectsView />}/>
            <Route path="/project/:id" element={<ProjectView />}/>
        </Route>
    )
);
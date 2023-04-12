import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../tools/auth";
import React from "react";

export const ProfileLayout = () => {
    const { access_token } = useAuth();
    const location = useLocation();

    if (!access_token) {
        return <Navigate to={`/login?backUrl=${location.pathname}`} />;
    }

    return (
        <Outlet />
    )
};

import {Navigate, Outlet, useLocation, useOutletContext} from "react-router-dom";
import {useAuth} from "../tools/auth";
import {Profile, useProfileData} from "../modules/user";
import React from "react";



export const ProfileLayout = () => {
    const { access_token } = useAuth();
    const location = useLocation();
    const { data: profile, refetch } = useProfileData()

    if (!access_token) {
        return <Navigate to={`/login?backUrl=${location.pathname}`} />;
    }

    return (
        <Outlet context={{ ...profile, refetchProfile: refetch }} />
    )
};

export interface ProfileContextType extends Profile {
    refetchProfile: () => void
}
export function useProfileContext() {
    return useOutletContext<ProfileContextType>();
}

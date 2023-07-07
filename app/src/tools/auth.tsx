import React, {createContext, useContext, useMemo, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import service, {ACCESS_TOKEN} from "./service";
import Dialog from "@mui/material/Dialog";
import { TransitionDialog } from "../components";
import Login from "../view/Login";

export const AuthContext = createContext('auth' as any);

export const AuthProvider = ({ children }: {children: JSX.Element}) => {
    const access_token = localStorage.getItem(ACCESS_TOKEN)
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token")
    const [openLogin, setOpenLogin] = useState(false)

    if (token) {
        localStorage.setItem(ACCESS_TOKEN, token);
        navigate("/", { replace: true });
    }

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        service.interceptors.request.use(
            config => {
                config.headers['Authorization'] = undefined;
                return config;
            },
        );
        navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
            isAuth: !!access_token,
            openLogin: () => setOpenLogin(true),
            access_token,
            logout
        }),
        [access_token]
    );
    return <AuthContext.Provider value={value}>
        {children}
        <Dialog onClose={() => setOpenLogin(false)} open={openLogin} fullScreen TransitionComponent={TransitionDialog}>
            {openLogin && (
                <Login onClose={() => setOpenLogin(false)} />)}
        </Dialog>
    </AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

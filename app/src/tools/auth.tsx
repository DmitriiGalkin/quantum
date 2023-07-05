import React, {createContext, useContext, useMemo, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import service, {ACCESS_TOKEN, useUserByLogin} from "./service";
import Dialog from "@mui/material/Dialog";
import { TransitionDialog } from "../components";
import Login from "../view/Login";

export const AuthContext = createContext('auth' as any);

export interface LoginData { email: string, password: string }

export const useNavigateAfterLogin = () => {
    const navigate = useNavigate();

    const backUrl = localStorage.getItem('backUrl')
    if (backUrl) {
        return () => {
            navigate(backUrl ? backUrl : "/", { replace: true });
        }
    }
    return () => navigate("/", { replace: true });
}

export const AuthProvider = ({ children }: {children: JSX.Element}) => {
    const access_token = localStorage.getItem(ACCESS_TOKEN)
    const redirect = useNavigateAfterLogin()
    const navigate = useNavigate();
    const userByLogin = useUserByLogin()
    const [searchParams] = useSearchParams();
    const backUrl = searchParams.get("backUrl")
    const [openLogin, setOpenLogin] = useState(false)

    if (backUrl) {
        localStorage.setItem('backUrl', backUrl);
    }

    // Нативный логин
    const login = async (data: LoginData) => {
        userByLogin.mutateAsync(data).then((result: any) => {
            localStorage.setItem(ACCESS_TOKEN, result.access_token);
            service.interceptors.request.use(
                config => {
                    config.headers['Authorization'] = `Bearer ${result.access_token}`;
                    return config;
                },
            );
            redirect()
        })
    };

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
            login,
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

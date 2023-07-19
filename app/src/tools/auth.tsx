import React, {createContext, useContext, useMemo} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import service, {useUser} from "./service";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "../components";
import Login from "../view/Login";
import {useToggle} from "usehooks-ts";

export const ACCESS_TOKEN = 'access_token'
export const AuthContext = createContext('auth' as any);

export const AuthProvider = ({ children }: {children: JSX.Element}) => {
    const { data: user } = useUser();

    const [searchParams] = useSearchParams();
    const tokenSearchParam = searchParams.get("access_token")
    const access_token = localStorage.getItem(ACCESS_TOKEN) || tokenSearchParam
    const navigate = useNavigate();
    const [openLogin, toggleOpenLogin] = useToggle()
    const isAuth =  !!access_token
    if (tokenSearchParam) {
        localStorage.setItem(ACCESS_TOKEN, tokenSearchParam);
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

    /**
     * Функция триггер. Если пользователь авторизован, то функция вызовется,
     * если же нет, то запускается механизм авторизации
     */
    const authFn = (fn: () => void) => isAuth ? fn : toggleOpenLogin

    const value = useMemo(
        () => ({
            user,
            isAuth,
            openLogin: toggleOpenLogin,
            access_token,
            logout,
            authFn
        }),
        [access_token]
    );
    return <AuthContext.Provider value={value}>
        {children}
        <Dialog onClose={toggleOpenLogin} open={openLogin} fullScreen TransitionComponent={TransitionDialog}>
            {openLogin && <Login onClose={toggleOpenLogin} />}
        </Dialog>
    </AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

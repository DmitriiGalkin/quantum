import React, {createContext, useContext, useMemo} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import service, {usePassport} from "./service";
import Login from "../dialogs/Login";
import {useToggle} from "usehooks-ts";
import {Passport, User} from "./dto";

export const ACCESS_TOKEN = 'access_token'
export const AuthContext = createContext('auth' as any);

export const AuthProvider = ({ children }: {children: JSX.Element}) => {
    const { data: passport } = usePassport();
    const [searchParams] = useSearchParams();
    const tokenSearchParam = searchParams.get("access_token")
    const access_token = localStorage.getItem(ACCESS_TOKEN) || tokenSearchParam
    const navigate = useNavigate();
    const [openLogin, toggleOpenLogin] = useToggle()
    const isAuth =  !!access_token

    if (tokenSearchParam) {
        console.log('navigate', ACCESS_TOKEN, tokenSearchParam)
        localStorage.setItem(ACCESS_TOKEN, tokenSearchParam);
        // navigate("/");
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
            user: passport,
            passport,
            isAuth,
            openLogin: toggleOpenLogin,
            access_token,
            logout,
            authFn
        }),
        [access_token, passport]
    );
    return <AuthContext.Provider value={value}>
        {children}
        <Login open={openLogin} onClose={toggleOpenLogin} />
    </AuthContext.Provider>;
};

export interface Auth {
    user: User,
    passport: Passport,
    isAuth: boolean
    openLogin: () => void
    logout: () => void
    authFn: (fn: () => void) => () => void
}

export const useAuth = (): Auth => {
    return useContext(AuthContext);
};

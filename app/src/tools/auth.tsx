import React, {createContext, useContext, useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import service, {useAddIdea, useAddUser, usePassport} from "./service";
import Login from "../dialogs/Login";
import {useLocalStorage, useToggle} from "usehooks-ts";
import {Passport, User} from "./dto";
import {FAST_IDEA} from "../dialogs/FastIdea";

export const ACCESS_TOKEN = 'access_token'
export const AuthContext = createContext('auth' as any);

export const AuthProvider = ({ children }: {children: JSX.Element}) => {
    const { data: passport, refetch } = usePassport();
    const [searchParams] = useSearchParams();
    const tokenSearchParam = searchParams.get("access_token")
    const access_token = localStorage.getItem(ACCESS_TOKEN) || tokenSearchParam
    const navigate = useNavigate();
    const [openLogin, toggleOpenLogin] = useToggle()
    const isAuth =  !!access_token
    const [selectedUserId, setSelectedUserId] = useLocalStorage('selectedUserId', 0)

    if (tokenSearchParam) {
        localStorage.setItem(ACCESS_TOKEN, tokenSearchParam);
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

    const user = passport?.users.length ? passport?.users.find((u) => u.id === selectedUserId) || passport?.users[0] : undefined



    return <AuthContext.Provider value={{
        user,
        passport,
        isAuth,
        openLogin: toggleOpenLogin,
        access_token,
        logout,
        authFn,
        setSelectedUserId,
    }}>
        {children}
        <Login open={openLogin} onClose={toggleOpenLogin} />
        {/*<PassportDialog open={isAuth && !passport?.users[0]} onClose={refetch} />*/}
    </AuthContext.Provider>;
};

export interface Auth {
    user: User,
    passport: Passport,
    isAuth: boolean
    openLogin: () => void
    logout: () => void
    authFn: (fn: () => void) => () => void
    setSelectedUserId: (userId: number) => void
}

export const useAuth = (): Auth => {
    return useContext(AuthContext);
};

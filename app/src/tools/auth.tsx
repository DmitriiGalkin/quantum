import {createContext, useContext, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {useUserByLogin} from "../modules/user";
import service, {ACCESS_TOKEN} from "./service";

export const AuthContext = createContext('auth' as any);

export interface LoginData { email: string, password: string }

export const AuthProvider = ({ children }: {children: JSX.Element}) => {
    const access_token = localStorage.getItem(ACCESS_TOKEN)
    const navigate = useNavigate();
    const userByLogin = useUserByLogin()

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
            navigate("/");
        })
    };

    // // Гугл логин
    // const googleLogin = async (data: LoginData) => {
    //     userByLogin.mutateAsync(data).then((result: any) => {
    //         localStorage.setItem(ACCESS_TOKEN, result.access_token);
    //         service.interceptors.request.use(
    //             config => {
    //                 config.headers['Authorization'] = `Bearer ${result.access_token}`;
    //                 return config;
    //             },
    //         );
    //         navigate("/");
    //     })
    // };

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
            access_token,
            login,
            // googleLogin,
            logout
        }),
        [access_token]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

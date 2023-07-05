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

export const GOOGLE_O_AUTH_PROVIDER_CLIENT_ID = "804980223837-9e350rj8p8glgbqel5c5rmh6jafnf1u2.apps.googleusercontent.com"
const GOOGLE_AUTH_URI = 'https://accounts.google.com/o/oauth2/auth'; // Запрос на авторизацию
export const GOOGLE_TOKEN_URI = 'https://accounts.google.com/o/oauth2/token'; // Запрос токена
export const GOOGLE_USER_INFO_URI = 'https://www.googleapis.com/oauth2/v1/userinfo'; // Информация по пользователю
export const GOOGLE_CLIENT_ID = '804980223837-9e350rj8p8glgbqel5c5rmh6jafnf1u2.apps.googleusercontent.com'; // Client ID
export const GOOGLE_CLIENT_SECRET = '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'; // Client Secret
export const GOOGLE_REDIRECT_URI = 'https://selfproject.ru/callback'; // Адрес редиректа после авторизации 'http://localhost:3000/callback'

export const uri = GOOGLE_AUTH_URI + '?' + http_build_query({
    'redirect_uri': GOOGLE_REDIRECT_URI,
    'response_type': 'code',
    'client_id': GOOGLE_CLIENT_ID,
    'scope': 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
})


// Generate URL-encoded query string
function http_build_query( formdata: any ) {
    var key, use_val, use_key, i = 0, tmp_arr = [];
    var arg_separator = '&';

    for(key in formdata){
        use_key = escape(key);
        use_val = escape((formdata[key].toString()));
        use_val = use_val.replace(/%20/g, '+');

        tmp_arr[i] = use_key + '=' + use_val;
        i++;
    }

    return tmp_arr.join(arg_separator);
}
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
            logout
        }),
        [access_token]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

const GOOGLE_AUTH_URI = 'https://accounts.google.com/o/oauth2/auth'; // Запрос на авторизацию
export const GOOGLE_TOKEN_URI = 'https://accounts.google.com/o/oauth2/token'; // Запрос токена
// export const GOOGLE_USER_INFO_URI = 'https://www.googleapis.com/oauth2/v1/userinfo'; // Информация по пользователю
export const GOOGLE_CLIENT_ID = '804980223837-9e350rj8p8glgbqel5c5rmh6jafnf1u2.apps.googleusercontent.com'; // Client ID
export const GOOGLE_CLIENT_SECRET = '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'; // Client Secret
export const GOOGLE_REDIRECT_URI = 'https://selfproject.ru/callback'; // Адрес редиректа после авторизации

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
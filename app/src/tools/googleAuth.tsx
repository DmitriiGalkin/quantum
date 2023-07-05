import React from "react";
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {UseMutate} from "./service";
import {useMutation, useQuery, UseQueryResult} from "@tanstack/react-query";

export const GOOGLE_O_AUTH_PROVIDER_CLIENT_ID = "804980223837-9e350rj8p8glgbqel5c5rmh6jafnf1u2.apps.googleusercontent.com"
const GOOGLE_AUTH_URI = 'https://accounts.google.com/o/oauth2/auth'; // Запрос на авторизацию
export const GOOGLE_TOKEN_URI = 'https://accounts.google.com/o/oauth2/token'; // Запрос токена
export const GOOGLE_USER_INFO_URI = 'https://www.googleapis.com/oauth2/v1/userinfo'; // Информация по пользователю
export const GOOGLE_CLIENT_ID = '804980223837-9e350rj8p8glgbqel5c5rmh6jafnf1u2.apps.googleusercontent.com'; // Client ID
export const GOOGLE_CLIENT_SECRET = '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'; // Client Secret
export const GOOGLE_REDIRECT_URI = 'https://selfproject.ru/google' // Адрес редиректа после авторизации 'http://localhost:3000/callback'

export const uri = GOOGLE_AUTH_URI + '?' + http_build_query({
    'redirect_uri': GOOGLE_REDIRECT_URI,
    'response_type': 'code',
    'client_id': GOOGLE_CLIENT_ID,
    'scope': 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
})

export const createService = (): AxiosInstance => {
    const service = axios.create()
    service.interceptors.request.use((config: AxiosRequestConfig) => ({
        baseURL: GOOGLE_TOKEN_URI,
        ...config,
    }))
    service.interceptors.response.use(( axiosResponse) => axiosResponse.data)


    return service
}

export const useData = (parameters: any): UseMutate<any> => {
    return useMutation(() => googleService.post(``, parameters))
}

export const useGoogleToken = (code: string): UseQueryResult<any> => {
    const parameters = {
        'client_id': GOOGLE_CLIENT_ID,
        'client_secret': GOOGLE_CLIENT_SECRET,
        'redirect_uri': GOOGLE_REDIRECT_URI,
        'grant_type': 'authorization_code',
        code,
    };

    return useQuery(['GoogleToken'], () => googleService.post(``, parameters),)
}

const googleService = createService()

export const createService3 = (): AxiosInstance => {
    const service = axios.create()
    service.interceptors.request.use((config: AxiosRequestConfig) => ({
        baseURL: GOOGLE_USER_INFO_URI,
        ...config,
    }))
    service.interceptors.response.use(( axiosResponse) => axiosResponse.data)


    return service
}
export const googleInfoUserService = createService3()


export const useGoogleInfoUser = (): UseMutate<any> => {
    return useMutation(() => googleInfoUserService.get(``))
}



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
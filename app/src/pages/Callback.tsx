import React, {useEffect} from 'react';
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {useMutation, useQuery, UseQueryResult} from "@tanstack/react-query";
import {useNavigate, useSearchParams} from "react-router-dom";
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_TOKEN_URI} from "../tools/auth";
import service, {ACCESS_TOKEN, UseMutate} from "../tools/service";

export const useData = (parameters: any): UseMutate<any> => {
    return useMutation(() => googleService.post(``, parameters))
}

export const useGoogleToken = (parameters: any): UseQueryResult<any> => {
    return useQuery(['GoogleToken'], () => googleService.post(``, parameters),)
}

export const useLogi = (): UseMutate<any> => {
    return useMutation((access_token: any) => service.post(`logi`, {access_token}))
}

export const createService = (): AxiosInstance => {
    const service = axios.create()
    service.interceptors.request.use((config: AxiosRequestConfig) => ({
        baseURL: GOOGLE_TOKEN_URI,
        ...config,
    }))
    service.interceptors.response.use(( axiosResponse) => axiosResponse.data)


    return service
}

const googleService = createService()

/**
 * Посадочная страница успешной авторизации в гугле
 */
export default function CallbackPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code")

    const parameters = {
        'client_id': GOOGLE_CLIENT_ID,
        'client_secret': GOOGLE_CLIENT_SECRET,
        'redirect_uri': GOOGLE_REDIRECT_URI,
        'grant_type': 'authorization_code',
        code,
    };
    const { data: googleToken } = useGoogleToken(parameters)

    const logi = useLogi()

    const login = async () => {
        // Запрашиваем данные авторизации
        logi.mutateAsync(googleToken.access_token).then((r) => {
            localStorage.setItem(ACCESS_TOKEN, googleToken.access_token);
            console.log(googleToken.access_token,'then access_token')

            service.interceptors.request.use(
                config => {
                    config.headers['Authorization'] = `Bearer ${googleToken.access_token}`;
                    return config;
                }, function (error) {
                    // Do something with request error
                    return Promise.reject(error);
                }
            );
            service.interceptors.request.use(
                config => {
                    console.log(config,'config')
                    return config;
                }, function (error) {
                    // Do something with request error
                    return Promise.reject(error);
                }
            );
            navigate("/");
        }).catch(console.log);

    }

    useEffect(() => {
        login()
    }, [googleToken])


    return <div>2</div>;
}

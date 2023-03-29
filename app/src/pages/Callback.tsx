import React, {useEffect, useState} from 'react';
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {useMutation} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_USER_INFO_URI} from "../auth";
import {UseMutate} from "../tools/service";

export const useData = (parameters: any): UseMutate<any> => {
    // return useQuery(['data'], () => service.post(``, parameters))
    return useMutation(() => service.post(``, parameters))
}

export const createService = (): AxiosInstance => {
    const service = axios.create()
    service.interceptors.request.use((config: AxiosRequestConfig) => ({
        baseURL: 'https://accounts.google.com/o/oauth2/token',
        ...config,
    }))
    service.interceptors.response.use(( axiosResponse) => axiosResponse.data)


    return service
}

const service = createService()



const createService3 = (access_token: string): AxiosInstance => {
    const service = axios.create()
    service.interceptors.request.use((config: AxiosRequestConfig) => ({
        baseURL: GOOGLE_USER_INFO_URI,
        headers: { Authorization: `Bearer ${access_token}` },
        ...config,
    }))
    service.interceptors.response.use(( axiosResponse) => axiosResponse.data)
    console.log(service,'service')
    return service
}

export default function CallbackPage() {
    const [access_token, setAccess_token] = useState();

    const [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get("code")

    console.log(code, 'code')
    const parameters = {
        'client_id': GOOGLE_CLIENT_ID,
        'client_secret': GOOGLE_CLIENT_SECRET,
        'redirect_uri': GOOGLE_REDIRECT_URI,
        'grant_type': 'authorization_code',
        code,
    };


    const sdata = useData(parameters)

    if (access_token) {
        localStorage.setItem("access_token", access_token);
        console.log(access_token, 'access_token')
        const config = {
            headers: { Authorization: `Bearer ${access_token}` }
        };

        const bodyParameters = {
            key: "value"
        };

        axios.get(
            GOOGLE_USER_INFO_URI,
            config
        ).then(console.log).catch(console.log);

        // Сохраняем
        axios.post(
            'http://localhost:8080/logi',
            {access_token}
        ).then(console.log).catch(console.log);

    }

    useEffect(() => {
        sdata.mutateAsync(parameters).then((result: any) => {
            setAccess_token(result.access_token)
        })
    }, [code])


    return (
<div>2</div>    );
}

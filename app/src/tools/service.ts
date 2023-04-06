import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios'
import {UseMutationResult} from "@tanstack/react-query";

const SAME_URL = 'http://localhost:4000' // 'http://localhost:4000' // 'https://selfproject.ru/api'
export const ACCESS_TOKEN = 'access_token'

export const createService = (): AxiosInstance => {
    // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;

    const service = axios.create()
    service.interceptors.request.use((config: AxiosRequestConfig) => ({
        baseURL: SAME_URL,
        ...config,
    }))
    service.interceptors.request.use((config: AxiosRequestConfig) => {
        config.headers.Authorization = "Bearer " + localStorage.getItem(ACCESS_TOKEN);
        return config;
    })
    service.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response.status === 401) {
            localStorage.removeItem(ACCESS_TOKEN);
        }
        return error;
    });

    service.interceptors.response.use(( axiosResponse) => axiosResponse.data)



    return service
}

const service = createService()

export type UseMutate<TVariables, TData = unknown, TError = AxiosError, TContext = unknown> = UseMutationResult<
    TData,
    TError,
    TVariables,
    TContext
    >

export default service

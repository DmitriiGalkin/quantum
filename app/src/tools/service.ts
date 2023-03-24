import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios'
import {UseMutationResult} from "@tanstack/react-query";

const SAME_URL = window.location.protocol + '//' + window.location.hostname + ':3001/api/v1/'

export const createService = (): AxiosInstance => {
    const service = axios.create()
    service.interceptors.request.use((config: AxiosRequestConfig) => ({
        baseURL: SAME_URL,
        headers: { Authorization: `Bearer 51` },
        ...config,
    }))
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

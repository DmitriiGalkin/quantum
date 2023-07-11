import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios'
import {useMutation, UseMutationResult, useQuery, UseQueryResult} from "@tanstack/react-query";
import {Meet, User} from "./dto";
import {ACCESS_TOKEN} from "./auth";

// При разработки хост может быть разным
const developmentServer = window.location.protocol + '//' + window.location.hostname + ':4000'

const BASE_URL = process.env.NODE_ENV === 'development' ? developmentServer : 'https://selfproject.ru/api'

export const createService = (): AxiosInstance => {
    const service = axios.create()
    service.interceptors.request.use((config: AxiosRequestConfig) => ({
        baseURL: BASE_URL,
        ...config,
    }))
    service.interceptors.request.use((config: AxiosRequestConfig) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    })
    service.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response.status === 401) {
            localStorage.removeItem(ACCESS_TOKEN);
            window.location.reload();
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

interface GetMeets {
    latitude?: string
    longitude?: string
}

/**
 * Встречи
 */
export const useMeets = (params?: GetMeets): UseQueryResult<Meet[]> => useQuery(['meets'], () => service.get(`/meets`, {
    params,
}))

//     ,{
//     enabled: Boolean(params?.latitude) || Boolean(params?.longitude),
// }
export const useMeet = (id?: number): UseQueryResult<Meet> => {
    return useQuery(['meet', id], () => service.get(`/meet/${id}`), {
        enabled: Boolean(id),
    })
}
export const useMeetUsers = (id: number): UseQueryResult<User[]> => {
    return useQuery(['meetUsers', id], () => service.get(`/meet/${id}/users`),)
}

export const useAddMeet = (): UseMutate<Meet> => useMutation((meet) => service.post("/meet", meet))
export const useEditMeet = (): UseMutate<Meet> => useMutation((meet) => service.put(`/meet/${meet.id}`, meet))

/**
 * Картинки
 */
export const useUploadImage = (): UseMutate<FormData, string> => {
    return useMutation((formData) => service.post(`/image`, formData, { headers: { "Content-Type": "multipart/form-data" }}))
}

/**
 * Авторизации
 */
export const useGoogleLogin = (): UseMutate<User> => useMutation((data: any) => service.post(`/user/googleLogin`, data))

/**
 * Пользователь
 */
export const useUser = (): UseQueryResult<User> => useQuery(['user'], () => service.get(`/user`))
export const useUpdateUser = (): UseMutate<User> => useMutation((user) => service.put(`/user`, user))
export const useToggleMeetUser = (): UseMutate<number> => useMutation((meetId) => service.put("/userMeet/" + meetId))
export const useDeleteMeet = (): UseMutate<number> => useMutation((meetId) => service.delete(`/meet/${meetId}`))

export default service

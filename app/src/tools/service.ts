import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios'
import {useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import {Meet, Place, User} from "./dto";
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
export const useMeets = (params?: GetMeets): UseQueryResult<Meet[]> => useQuery(['meets'], () => service.get(`/meets`, { params }))
export const useMeet = (id?: number): UseQueryResult<Meet> => {
    return useQuery(['meet', id], () => service.get(`/meet/${id}`), {
        enabled: Boolean(id),
    })
}
export const useMeetUsers = (id: number): UseQueryResult<User[]> => useQuery(['meetUsers', id], () => service.get(`/meet/${id}/users`))
export const useAddMeet = (): UseMutate<Meet> => {
    const queryClient = useQueryClient()
    return useMutation((meet) => service.post("/meet", meet), {
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['meets'] })
        },
    })
}
export const useEditMeet = (id: number): UseMutate<Meet> => {
    const queryClient = useQueryClient()
    return useMutation((meet) => service.put(`/meet/${id}`, meet), {
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['meet', id] })
        },
    })
}

/**
 * Картинки
 */
export const useUploadImage = (): UseMutate<FormData, string> => {
    return useMutation((formData) => service.post(`/image`, formData, { headers: { "Content-Type": "multipart/form-data" }}))
}

/**
 * Пользователь
 */
export const useUser = (): UseQueryResult<User> => useQuery(['user'], () => service.get(`/user`))
export const useUpdateUser = (): UseMutate<User> => useMutation((user) => service.put(`/user`, user))
export const useToggleMeetUser = (): UseMutate<number> => useMutation((meetId) => service.put("/userMeet/" + meetId))
export const useDeleteMeet = (): UseMutate<number> => useMutation((meetId) => service.delete(`/meet/${meetId}`))

/**
 * Место
 */
export const usePlaces = (): UseQueryResult<Place[]> => useQuery(['places'], () => service.get(`/places`))
export const useAddPlace = (): UseMutate<Place> => useMutation((place) => service.post("/place", place))

export default service

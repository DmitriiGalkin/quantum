import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios'
import {useMutation, UseMutationResult, useQuery, UseQueryResult} from "@tanstack/react-query";
import {LoginData} from "./auth";
import {Meet, NewMeet, Profile, User} from "./dto";

// При разработки хост может быть разным
const developmentServer = window.location.protocol + '//' + window.location.hostname + ':4000'

const BASE_URL = process.env.NODE_ENV === 'development' ? developmentServer : 'https://selfproject.ru/api'
export const ACCESS_TOKEN = 'access_token'

export const createService = (): AxiosInstance => {
    const service = axios.create()
    service.interceptors.request.use((config: AxiosRequestConfig) => ({
        baseURL: BASE_URL,
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

/**
 * Картинки
 */
export const useUploadImage = (): UseMutate<FormData, string> => {
    return useMutation((formData) => service.post(`/image`, formData, { headers: { "Content-Type": "multipart/form-data" }}))
}

/**
 * Встречи
 */
export const useMeets = (): UseQueryResult<Meet[]> => useQuery(['meets'], () => service.get(`/meets`))
export const useMeet = (id?: number): UseQueryResult<Meet> => {
    return useQuery(['meet', id], () => service.get(`/meet/${id}`), {
        enabled: Boolean(id),
    })
}
export const useMeetUsers = (id: number): UseQueryResult<User[]> => {
    return useQuery(['meetUsers', id], () => service.get(`/meet/${id}/users`),)
}

export const useAddMeet = (): UseMutate<NewMeet> => useMutation((meet) => service.post("/meet", meet))
export const useEditMeet = (): UseMutate<NewMeet> => useMutation((meet) => service.put(`/meet/${meet.id}`, meet))

/**
 * Пользователь
 */

export const useProfileData = (): UseQueryResult<Profile> => {
    return useQuery(['profile'], () => service.get(`/profile`))
}

export const useUser = (): UseQueryResult<User> => {
    return useQuery(['user'], () => service.get(`/user`))
}

export const useUpdateUser = (): UseMutate<User> => useMutation((user) => service.put(`/user`, user))

export const useUserByLogin = (): UseMutate<LoginData> => useMutation((data) => service.post("/user/login", data))

interface UserMeet {
    meetId: number
}

export const useToggleMeetUser = (): UseMutate<UserMeet> => useMutation(({ meetId }) => service.put("/userMeet/" + meetId))

export const useDeleteMeet = (): UseMutate<Meet> => useMutation((meet) => service.delete(`/meet/${meet.id}`))


export default service

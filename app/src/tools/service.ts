import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios'
import {useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import {Meet, Passport, Place, Project, User, Visit} from "./dto";
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
        const accessToken = localStorage.getItem(ACCESS_TOKEN)
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    })
    service.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response.status === 401) {
            // localStorage.removeItem(ACCESS_TOKEN);
            // window.location.reload();
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
    latitude?: number
    longitude?: number
}

/**
 * Встречи
 */
export const useMeets = (params?: GetMeets): UseQueryResult<Meet[]> => useQuery(['meets'], () => service.get(`/meets`, { params }), {
    enabled: Boolean(params?.latitude) || Boolean(params?.longitude),
})
export const useMeet = (id?: number): UseQueryResult<Meet> => useQuery(['meet', id], () => service.get(`/meet/${id}`), {
    enabled: Boolean(id),
})
export const useAddMeet = (): UseMutate<Partial<Meet>> => {
    const queryClient = useQueryClient()
    return useMutation((meet) => service.post("/meet", meet), {
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['meets'] })
        },
    })
}
export const useEditMeet = (id?: number): UseMutate<Partial<Meet>> => {
    const queryClient = useQueryClient()
    return useMutation((meet) => service.put(`/meet/${id}`, meet), {
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['meet', id] })
        },
    })
}
export const useDeleteMeet = (): UseMutate<number> => useMutation((meetId) => service.delete(`/meet/${meetId}`))

/**
 * Картинки
 */
export const useUploadImage = (): UseMutate<FormData, string> => {
    return useMutation((formData) => service.post(`/image`, formData, { headers: { "Content-Type": "multipart/form-data" }}))
}

export const usePassport = (): UseQueryResult<Passport> => useQuery(['passport'], () => service.get(`/passport`))
export const useUpdatePassport = (): UseMutate<Passport> => useMutation((passport) => service.put(`/passport`, passport))

/**
 * Пользователь
 */
//export const useUpdateUser = (): UseMutate<User> => useMutation((user) => service.put(`/user`, user))
export const useVisits = (): UseQueryResult<Meet[]> => useQuery(['visits'], () => service.get(`/visits`))

export interface EditVisit extends Omit<Visit, "id"> { id?: number; }
export const useCreateVisit = (): UseMutate<EditVisit> => useMutation((visit) => service.post("/visit/" + visit.userId + "/" + visit.meetId))
export const useStartedVisit = (): UseMutate<Visit> => useMutation((visit) => service.post("/visit/" + visit.userId + "/" + visit.meetId + "/started"))
export const useStoppedVisit = (): UseMutate<Visit> => useMutation((visit) => service.post("/visit/" + visit.userId + "/" + visit.meetId + "/stopped"))
export const usePaidedVisit = (): UseMutate<Visit> => useMutation((visit) => service.post("/visit/" + visit.userId + "/" + visit.meetId + "/paided"))
export const useDeleteVisit = (): UseMutate<Visit> => useMutation((visit) => service.delete("/visit/" + visit.userId + "/" + visit.meetId))

/**
 * Место
 */
export const usePlaces = (): UseQueryResult<Place[]> => useQuery(['places'], () => service.get(`/places`))
export const useAddPlace = (): UseMutate<Place> => {
    const queryClient = useQueryClient()
    return useMutation((place) => service.post("/place", place), {
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['places'] })
        },
    })
}

/**
 * Проект
 */
export const useProjects = (): UseQueryResult<Project[]> => useQuery(['projects'], () => service.get(`/projects`))
export const useProject = (id?: number): UseQueryResult<Project> => useQuery(['project', id], () => service.get(`/project/${id}`), {
    enabled: Boolean(id),
})

export interface EditProject extends Omit<Project, "id" | "userId"> { id?: number; userId?: number }
export const useAddProject = (): UseMutate<EditProject> => useMutation((project) => service.post("/project", project))
export const useEditProject = (id?: number): UseMutate<EditProject> => useMutation((project) => service.put(`/project/${id}`, project))

export default service

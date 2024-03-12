import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

import { ACCESS_TOKEN } from './auth'
import { Idea, Meet, Participation, Passport, Place, Project, User, Visit } from './dto'

// При разработки хост может быть разным
const developmentServer = window.location.protocol + '//' + window.location.hostname + ':4000'

const BASE_URL = process.env.REACT_APP_SERVER === 'localhost' ? developmentServer : 'https://selfproject.ru/api'

export const createService = (): AxiosInstance => {
  const service = axios.create()
  service.interceptors.request.use((config: AxiosRequestConfig) => ({
    baseURL: BASE_URL,
    ...config,
  }))
  service.interceptors.request.use((config: AxiosRequestConfig) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  })
  service.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem(ACCESS_TOKEN)
        window.location.reload()
      }
      return error
    },
  )

  service.interceptors.response.use((axiosResponse) => axiosResponse.data)

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
 * Встречи
 */
export const useMeets = (userId?: number, isForPassport?: boolean): UseQueryResult<Meet[]> =>
  useQuery(['meets'], () => service.get(`/meets?userId=${userId}&isForPassport=${isForPassport}`))
export const useMeet = (id?: string): UseQueryResult<Meet> =>
  useQuery(['meet', id], () => service.get(`/meet/${id}`), {
    enabled: Boolean(id),
  })
export const useAddMeet = (): UseMutate<Partial<Meet>> => {
  const queryClient = useQueryClient()
  return useMutation((meet) => service.post('/meet', meet), {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['meets'] })
    },
  })
}
export const useEditMeet = (id?: string): UseMutate<Partial<Meet>> => {
  return useMutation((meet) => service.put(`/meet/${id}`, meet))
}
export const useDeleteMeet = (): UseMutate<number | undefined> =>
  useMutation((meetId) => service.delete(`/meet/${meetId}`))

/**
 * Картинки
 */
export const useUploadImage = (): UseMutate<FormData, string> => {
  return useMutation((formData) =>
    service.post(`/image`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  )
}

export const usePassport = (): UseQueryResult<Passport> => useQuery(['passport'], () => service.get(`/passport`))
export const useUpdatePassport = (): UseMutate<Passport> =>
  useMutation((passport) => service.put(`/passport`, passport))
// //export const useUpdateUser = (): UseMutate<User> => useMutation((user) => service.put(`/user`, user))
// export const useDeleteUser = (): UseMutate<User> => useMutation((user) => service.delete("/user/" + user.id))

/**
 * Ребенок
 */
export const useUser = (id?: string): UseQueryResult<User> =>
  useQuery(['user', id], () => service.get(`/user/${id}`), {
    enabled: Boolean(id),
  })
export const useAddUser = (): UseMutate<Partial<User>> => {
  const queryClient = useQueryClient()
  return useMutation((user) => service.post('/user', user), {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['passport'] })
    },
  })
}
export const useEditUser = (id?: string): UseMutate<Partial<User>> => {
  const queryClient = useQueryClient()
  return useMutation((user) => service.put(`/user/${id}`, user), {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['passport', id] })
    },
  })
}
export const useDeleteUser = (): UseMutate<number | undefined> =>
  useMutation((userId) => service.delete(`/user/${userId}`))

/**
 * Посещение
 */
export const useVisits = (userId?: number): UseQueryResult<Visit[]> =>
  useQuery(['visits'], () => service.get(`/visits?userId=${userId}`), {
    enabled: Boolean(userId),
  })
export interface EditVisit extends Omit<Visit, 'id'> {
  id?: number
}
export const useCreateVisit = (): UseMutate<EditVisit> => useMutation((visit) => service.post('/visit', visit))
export const useStartedVisit = (): UseMutate<Visit> =>
  useMutation((visit) => service.post('/visit/' + visit.id + '/started'))
export const useStoppedVisit = (): UseMutate<Visit> =>
  useMutation((visit) => service.post('/visit/' + visit.id + '/stopped'))
export const usePaidedVisit = (): UseMutate<Visit> =>
  useMutation((visit) => service.post('/visit/' + visit.id + '/paided'))
export const useDeleteVisit = (): UseMutate<Visit> => useMutation((visit) => service.delete('/visit/' + visit.id))

/**
 * Место
 */
export const usePlaces = (): UseQueryResult<Place[]> => useQuery(['places'], () => service.get(`/places`))
export const useAddPlace = (): UseMutate<Place> => {
  const queryClient = useQueryClient()
  return useMutation((place) => service.post('/place', place), {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['places'] })
    },
  })
}

/**
 * Проект
 */
export interface ProjectFilter {
  variant?: 'self' | 'participation' | 'recommendation'
  deleted?: boolean
  userId?: string | number
}
export const useProjects = (params?: ProjectFilter): UseQueryResult<Project[]> =>
  useQuery(['projects', params?.variant, params?.deleted, params?.userId], () => service.get(`/projects`, { params }))
export const useProject = (id?: string): UseQueryResult<Project> =>
  useQuery(['project', id], () => service.get(`/project/${id}`), {
    enabled: Boolean(id),
  })

export const useAddProject = (): UseMutate<Partial<Project>> =>
  useMutation((project) => service.post('/project', project))
export const useEditProject = (id?: string): UseMutate<Partial<Project>> =>
  useMutation((project) => service.put(`/project/${id}`, project))
export const useDeleteProject = (): UseMutate<number | undefined> =>
  useMutation((projectId) => service.delete('/project/' + projectId))

/**
 * Подписка
 */
export const useCreateParticipation = (): UseMutate<{ projectId: number; userId: number }> =>
  useMutation((params) => service.post('/participation', params))
export const useDeleteParticipation = (): UseMutate<Participation> =>
  useMutation((participation) => service.delete('/participation/' + participation.id))

/**
 * Идея
 */
export interface IdeaFilter {
  variant?: 'self' | 'recommendation'
  userId?: string | number
  ageFrom?: number
  ageTo?: number
  latitude?: string
  longitude?: string
}
export const useIdeas = (params?: IdeaFilter): UseQueryResult<Idea[]> =>
  useQuery(
    ['ideas', params?.variant, params?.ageFrom, params?.ageTo, params?.userId, params?.latitude, params?.longitude],
    () => service.get(`/ideas`, { params }),
  )
export const useIdea = (id?: string): UseQueryResult<Idea> =>
  useQuery(['idea', id], () => service.get(`/idea/${id}`), {
    enabled: Boolean(id),
  })
export const useAddIdea = (): UseMutate<Partial<Idea>> => {
  const queryClient = useQueryClient()
  return useMutation((data) => service.post('/idea', data), {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['ideas'] })
    },
  })
}
export const useEditIdea = (id?: string): UseMutate<Partial<Idea>> => {
  return useMutation((meet) => service.put(`/idea/${id}`, meet))
}
export const useDeleteIdea = (): UseMutate<number | undefined> =>
  useMutation((ideaId) => service.delete(`/idea/${ideaId}`))

/**
 * Приглашение
 */
export const useCreateInvite = (): UseMutate<{ projectId: number; userId: number; ideaId: number }> =>
  useMutation((params) => service.post('/invite', params))
export const useAcceptInvite = (): UseMutate<number | undefined> =>
  useMutation((inviteId) => service.post('/invite/' + inviteId + '/accept'))
export const useDeleteInvite = (): UseMutate<number | undefined> =>
  useMutation((inviteId) => service.delete('/invite/' + inviteId))

export default service

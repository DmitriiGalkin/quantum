import {useMutation, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import service, {UseMutate} from "../tools/service";
import {Unique} from "./unique";
import {Project} from "./project";
import {LoginData} from "../tools/auth";
import {Meet} from "./meet";

export interface User {
    id: number
    image?: string
    title: string
    points: number
    email?: string
    password?: string
}


export const useUser = (id?: number): UseQueryResult<User> => {
    return useQuery(['user', id], () => service.get(`/user/${id}`), {
        enabled: Boolean(id),
    })
}
export const useUserUniques = (id: number): UseQueryResult<Unique[]> => {
    return useQuery(['userUniques', id], () => service.get(`/user/${id}/uniques`),)
}
export const useOnlyUserUniques = (): UseQueryResult<Unique[]> => {
    return useQuery(['userUniques'], () => service.get(`/uniques`))
}

export const useUserProjects = (): UseQueryResult<Project[]> => {
    return useQuery(['userProjects'], () => service.get(`/projects`),)
}

export const useAddUser = (): UseMutate<User> => useMutation((user) => service.post("/user", user))
export const useUpdateUser = (): UseMutate<User> => useMutation((user) => service.put(`/user/${user.id}`, user))

export const useEditUserpoints = (id: number): UseMutate<number> => {
    const queryClient = useQueryClient()
    return useMutation((points) => service.post(`/userpoints/`, {points}), {
        onSuccess() {
            queryClient.invalidateQueries(['tasks'])
            queryClient.invalidateQueries(['user', id])
        },
    })
}

export const useUserByLogin = (): UseMutate<LoginData> => useMutation((data) => service.post("/user/login", data))


export const useUserMeet = (): UseQueryResult<Meet[]> => {
    return useQuery(['userMeets'], () => service.get(`/meets`))
}
export const useOnlyUserProjects = (): UseQueryResult<Project[]> => {
    return useQuery(['projects'], () => service.get(`/projects`))
}




interface ProjectUser {
    projectId: number
    userId?: number
}

export const useAddProjectUser = (projectId: number): UseMutate<ProjectUser> => {
    const queryClient = useQueryClient()

    return useMutation(({ projectId }) => service.post(`/userProject/${projectId}`), {
        onSuccess() {
            queryClient.invalidateQueries(['projects'])
            queryClient.invalidateQueries(['project', projectId])
        },
    })
}
export const useDeleteProjectUser = (projectId: number): UseMutate<ProjectUser> => {
    const queryClient = useQueryClient()

    return useMutation(({ projectId }) => service.delete(`/userProject/${projectId}`), {
        onSuccess() {
            queryClient.invalidateQueries(['projects'])
            queryClient.invalidateQueries(['project', projectId])
        },
    })
}
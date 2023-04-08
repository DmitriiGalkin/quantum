import {useMutation, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import service, {UseMutate} from "../tools/service";
import {Unique} from "./unique";
import {Project} from "./project";
import {LoginData} from "../tools/auth";
import {Meet} from "./meet";
import {AvatarProps} from "../dialogs/Options";

export interface User {
    id: number
    title: string
    avatar: AvatarProps
    points: number
    email?: string
    password?: string
}


export const useUser = (): UseQueryResult<User> => {
    return useQuery(['user'], () => service.get(`/user`))
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

export const useAddProjectUser = (projectId?: number): UseMutate<ProjectUser> => {
    const queryClient = useQueryClient()

    return useMutation(({ projectId }) => service.post(`/userProject/${projectId}`), {
        onSuccess() {
            queryClient.invalidateQueries(['projects'])
            queryClient.invalidateQueries(['project', projectId])
        },
    })
}
export const useDeleteProjectUser = (projectId?: number): UseMutate<ProjectUser> => {
    const queryClient = useQueryClient()

    return useMutation(({ projectId }) => service.delete(`/userProject/${projectId}`), {
        onSuccess() {
            queryClient.invalidateQueries(['projects'])
            queryClient.invalidateQueries(['project', projectId])
        },
    })
}


interface UserMeet {
    meetId: number
    userId?: number
}

export const useAddMeetUser = (projectId?: number): UseMutate<UserMeet> => {
    const queryClient = useQueryClient()
    return useMutation(({ meetId }) => service.post("/user/" + meetId + '/meet'), {
        onSuccess() {
            queryClient.invalidateQueries(['userMeets'])
            queryClient.invalidateQueries(['project', projectId])
        },
    })
}
export const useDeleteMeetUser = (projectId?: number): UseMutate<UserMeet> => {
    const queryClient = useQueryClient()
    return useMutation(({ meetId }) => service.delete("/user/" + meetId + '/meet'), {
        onSuccess() {
            queryClient.invalidateQueries(['userMeets'])
            queryClient.invalidateQueries(['project', projectId])
        },
    })
}
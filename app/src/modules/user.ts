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

export interface Profile {
    user: User
    projectIds?: number[]
    meetIds?: number[]
}

export const useProfileData = (): UseQueryResult<Profile> => {
    return useQuery(['profile'], () => service.get(`/profile`))
}

export const useUser = (): UseQueryResult<User> => {
    return useQuery(['user'], () => service.get(`/user`))
}
export const useOnlyUserUniques = (): UseQueryResult<Unique[]> => {
    return useQuery(['userUniques'], () => service.get(`/uniques`))
}

export const useUserProjects = (): UseQueryResult<Project[]> => {
    return useQuery(['userProjects'], () => service.get(`/projects`),)
}

export const useUpdateUser = (): UseMutate<User> => useMutation((user) => service.put(`/user`, user))

export const useEditUserpoints = (): UseMutate<number> => {
    const queryClient = useQueryClient()
    return useMutation((points) => service.post(`/userpoints/`, {points}), {
        onSuccess() {
            queryClient.invalidateQueries(['tasks'])
        },
    })
}

export const useUserByLogin = (): UseMutate<LoginData> => useMutation((data) => service.post("/user/login", data))


export const useMeets = (): UseQueryResult<Meet[]> => {
    return useQuery(['meets'], () => service.get(`/meets`))
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
            queryClient.invalidateQueries(['profile'])
            queryClient.invalidateQueries(['project', projectId])
        },
    })
}
export const useDeleteProjectUser = (projectId?: number): UseMutate<ProjectUser> => {
    const queryClient = useQueryClient()

    return useMutation(({ projectId }) => service.delete(`/userProject/${projectId}`), {
        onSuccess() {
            queryClient.invalidateQueries(['profile'])
            queryClient.invalidateQueries(['project', projectId])
        },
    })
}


interface UserMeet {
    meetId: number
}

export const useToggleMeetUser = (): UseMutate<UserMeet> => useMutation(({ meetId }) => service.put("/userMeet/" + meetId))
export const useUpdateProject = (): UseMutate<Project> => useMutation((project) => service.put(`/project/${project.id}`, project))

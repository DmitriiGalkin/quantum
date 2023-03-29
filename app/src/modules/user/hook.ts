import {User} from "./types";
import {useMutation, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import service, {UseMutate} from "../../tools/service";
import {Unique} from "../unique";
import {Project} from "../project";
import {LoginData} from "../../tools/auth";
import {Meet} from "../meet";

export const useUser = (id: number): UseQueryResult<User> => {
    return useQuery(['user', id], () => service.get(`/user/${id}`),)
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

export const useEditUser = (userId: number): UseMutate<User> => {
    const queryClient = useQueryClient()
    return useMutation((user) => service.put(`/user/${user.id}`, user), {
        onSuccess() {
            queryClient.invalidateQueries(['user', userId])
        },
    })
}

export const useUserByLogin = (): UseMutate<LoginData> => useMutation((data) => service.post("/user/login", data))


export const useUserMeet = (): UseQueryResult<Meet[]> => {
    return useQuery(['userMeets'], () => service.get(`/meets`))
}
export const useOnlyUserProjects = (): UseQueryResult<Project[]> => {
    return useQuery(['onlyUserProjects'], () => service.get(`/projects`))
}

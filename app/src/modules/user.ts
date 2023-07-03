import {useMutation, useQuery, UseQueryResult} from "@tanstack/react-query";
import service, {UseMutate} from "../tools/service";
import {LoginData} from "../tools/auth";
import {Meet} from "./meet";

export interface User {
    id: number
    title: string
    image: string
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

export const useUpdateUser = (): UseMutate<User> => useMutation((user) => service.put(`/user`, user))

export const useUserByLogin = (): UseMutate<LoginData> => useMutation((data) => service.post("/user/login", data))


export const useMeets = (): UseQueryResult<Meet[]> => {
    return useQuery(['meets'], () => service.get(`/meets`))
}

interface UserMeet {
    meetId: number
}

export const useToggleMeetUser = (): UseMutate<UserMeet> => useMutation(({ meetId }) => service.put("/userMeet/" + meetId))

export const useDeleteMeet = (): UseMutate<Meet> => useMutation((meet) => service.delete(`/meet/${meet.id}`))

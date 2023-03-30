import {useMutation, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import service, {UseMutate} from "../tools/service";
import {User} from "./user";
import {Project} from "./project";

export interface Meet {
    id: number
    title?: string
    description?: string
    datetime: string
    active?: boolean
    image?: string
    projectId: number
    project: Project
    users: User[]
    endDatetime?: string,
}

export interface NewMeet {
    title?: string
    description?: string
    image: string | null
    projectId: number | null
    datetime?: string
    endDatetime?: string,
}

export const useMeets = (): UseQueryResult<Meet[]> => {
    return useQuery(['meets'], () => service.get(`/meet`),)
}
export const useMeetUsers = (id: number): UseQueryResult<User[]> => {
    return useQuery(['meetUsers', id], () => service.get(`/meet/${id}/users`),)
}

export const useAddMeet = (): UseMutate<NewMeet> => useMutation((meet) => service.post("/meet", meet))

interface MeetUser {
    meetId: number
    userId?: number
}


export const useAddMeetUser = (projectId?: number): UseMutate<MeetUser> => {
    const queryClient = useQueryClient()
    return useMutation(({ meetId }) => service.post("/user/" + meetId + '/meet'), {
        onSuccess() {
            queryClient.invalidateQueries(['userMeets'])
            queryClient.invalidateQueries(['projectMeets', projectId])
        },
    })
}
export const useDeleteMeetUser = (projectId?: number): UseMutate<MeetUser> => {
    const queryClient = useQueryClient()
    return useMutation(({ meetId }) => service.delete("/user/" + meetId + '/meet'), {
        onSuccess() {
            queryClient.invalidateQueries(['userMeets'])
            queryClient.invalidateQueries(['projectMeets', projectId])
        },
    })
}
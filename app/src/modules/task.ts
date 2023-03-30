import {useMutation, useQuery, UseQueryResult} from "@tanstack/react-query";
import service, {UseMutate} from "../tools/service";
import {User} from "./user";

export interface Task {
    id: number
    title: string
    points: number
}

export interface UserTask {
    id: number
    userid: number
    taskId: string
    task: Task
}
export const useTask = (id: number): UseQueryResult<User> => {
    return useQuery(['task', id], () => service.get(`/task/${id}`),)
}

export const useOnlyUserTasks = (): UseQueryResult<UserTask[]> => {
    return useQuery(['userTasks'], () => service.get(`/tasks`))
}

export const useEditUserTask = (): UseMutate<any> => useMutation((task) => service.put(`/task/${task.id}`, task))

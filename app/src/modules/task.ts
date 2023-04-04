import {useMutation, useQuery, UseQueryResult} from "@tanstack/react-query";
import service, {UseMutate} from "../tools/service";

export interface Task {
    id: number
    title: string
    points: number
}

export interface UserTask {
    id: number
    userId: number
    taskId: string
    task: Task
}
export const useUserTask = (id: number): UseQueryResult<UserTask> => {
    return useQuery(['task', id], () => service.get(`/task/${id}`),)
}

export const useOnlyUserTasks = (): UseQueryResult<UserTask[]> => {
    return useQuery(['userTasks'], () => service.get(`/tasks`))
}

export const useEditUserTask = (): UseMutate<any> => useMutation((task) => service.put(`/task/${task.id}`, task))

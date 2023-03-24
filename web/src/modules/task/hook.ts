import {useMutation, useQuery, UseQueryResult} from "@tanstack/react-query";
import service, {UseMutate} from "../../tools/service";
import {Task} from "./types";
import {User} from "../user";
import {useUnit} from "../../tools/hooks";

export const useTask = (id: number): UseQueryResult<User> => {
    return useQuery(['task', id], () => service.get(`/task/${id}`),)
}
export const useTasks = (): UseQueryResult<Task[]> => {
    return useQuery(['tasks'], () => service.get(`/task`),)
}
export const useOnlyUserTasks = (): UseQueryResult<Task[]> => {
    const user = useUnit();
    return useQuery(['userTasks', user.id], () => service.get(`/user/${user.id}/tasks`))
}

export const useEditTask = (): UseMutate<any> => useMutation((task) => service.put(`/task/${task.id}`, task))


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
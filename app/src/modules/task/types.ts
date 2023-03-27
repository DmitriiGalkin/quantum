
export interface Task {
    id: number
    title: string
    points: number
}

export interface UserTask {
    userid: number
    taskId: string
    task: Task
}
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '04167db9-f44d-4089-83a1-11d14204efcc'
    }
})

export const authAPI = {
    me(){
        return instance.get<ResponseType<MeType>>(` /auth/me`)
    },
    login(data: LoginParamsType){
        return instance.post<ResponseType<{userId: number}>>(` /auth/login`, data)
    },
    logout(){
        return instance.delete<ResponseType>(`/auth/login`)
    }
}

export const todoListAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>(`/todo-lists`)
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>(`/todo-lists`, {title})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}`)
    },
    updateTodoList(todoListId: string, title: string){
        return instance.put<ResponseType>(`/todo-lists/${todoListId}`, {title})
    }
}

export const taskAPI = {
    getTasks(todoListId: string){
        return instance.get<ResponseTasksType>(`/todo-lists/${todoListId}/tasks`)
    },
    createTask(todoListId: string, title: string){
        return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todoListId}/tasks`, {title})
    },
    deleteTask(todoListId: string, taskId: string){
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType){
        return instance.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todoListId}/tasks/${taskId}`, model)
    }
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export type MeType = {
    id: number
    email: string
    login: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type ResponseTasksType = {
    item: TaskType[]
    totalCount: number
    error: string | null
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}


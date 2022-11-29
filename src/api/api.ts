import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'd4e06bbb-2142-48c2-be24-68df57142f14'
    }
})

export const authAPI = {
    me(): Promise<ResponseType<MeType>> {
        return instance.get<ResponseType<MeType>>(`/auth/me`)
            .then(res => res.data)
    },
    login(data: LoginParamsType): Promise<ResponseType<{ userId: number }>> {
        return instance.post<ResponseType<{ userId: number }>>(`/auth/login`, data)
            .then(res => res.data)
    },
    logout(): Promise<ResponseType> {
        return instance.delete<ResponseType>(`/auth/login`)
            .then(res => res.data)
    }
}

export const todoListAPI = {
    getTodoLists(): Promise<TodoListType[]> {
        return instance.get<TodoListType[]>(`/todo-lists`)
            .then(res => res.data)
    },
    createTodoList(title: string): Promise<ResponseType<{ item: TodoListType }>> {
        return instance.post<ResponseType<{ item: TodoListType }>>(`/todo-lists`, {title})
            .then(res => res.data)
    },
    deleteTodoList(todoListId: string): Promise<ResponseType> {
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}`)
            .then(res => res.data)
    },
    updateTodoList(todoListId: string, title: string): Promise<ResponseType> {
        return instance.put<ResponseType>(`/todo-lists/${todoListId}`, {title})
            .then(res => res.data)
    }
}

export const taskAPI = {
    getTasks(todoListId: string): Promise<ResponseTasksType> {
        return instance.get<ResponseTasksType>(`/todo-lists/${todoListId}/tasks`)
            .then(res => res.data)
    },
    createTask(todoListId: string, title: string): Promise<ResponseType<{ item: TaskType }>> {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todoListId}/tasks`, {title})
            .then(res => res.data)
    },
    deleteTask(todoListId: string, taskId: string): Promise<ResponseType> {
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
            .then(res => res.data)
    },
    updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType): Promise<ResponseType<{ item: TaskType }>> {
        return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todoListId}/tasks/${taskId}`, model)
            .then(res => res.data)
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
    id: string
    todoListId: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    description: string
    addedDate: string
    startDate: string
    deadline: string
    order: number
}

export type ResponseTasksType = {
    items: TaskType[]
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


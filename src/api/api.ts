import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'd4e06bbb-2142-48c2-be24-68df57142f14'
    }
})

export const authAPI = {
    me(): Promise<AxiosResponse<ResponseType<MeType>>> {
        return instance.get<ResponseType<MeType>>(`/auth/me`)
    },
    login(data: LoginParamsType): Promise<AxiosResponse<ResponseType<{ userId: number }>>> {
        return instance.post<ResponseType<{ userId: number }>>(`/auth/login`, data)
    },
    logout(): Promise<AxiosResponse<ResponseType>> {
        return instance.delete<ResponseType>(`/auth/login`)
    }
}

export const todoListAPI = {
    getTodoLists(): Promise<AxiosResponse<TodoListType[]>> {
        return instance.get<TodoListType[]>(`/todo-lists`)
    },
    createTodoList(title: string): Promise<AxiosResponse<ResponseType<{ item: TodoListType }>>> {
        return instance.post<ResponseType<{ item: TodoListType }>>(`/todo-lists`, {title})
    },
    deleteTodoList(todoListId: string): Promise<AxiosResponse<ResponseType>> {
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}`)
    },
    updateTodoList(todoListId: string, title: string): Promise<AxiosResponse<ResponseType>> {
        return instance.put<ResponseType>(`/todo-lists/${todoListId}`, {title})
    }
}

export const taskAPI = {
    getTasks(todoListId: string): Promise<AxiosResponse<ResponseTasksType>> {
        return instance.get<ResponseTasksType>(`/todo-lists/${todoListId}/tasks`)
    },
    createTask(todoListId: string, title: string): Promise<AxiosResponse<ResponseType<{ item: TaskType }>>> {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todoListId}/tasks`, {title})
    },
    deleteTask(todoListId: string, taskId: string): Promise<AxiosResponse<ResponseType>> {
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType): Promise<AxiosResponse<ResponseType<{ item: TaskType }>>> {
        return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todoListId}/tasks/${taskId}`, model)
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


export type FieldErrorsType = Array<{ field: string, error: string }>;

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors?: FieldErrorsType
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
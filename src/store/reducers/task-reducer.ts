import {TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from '../../api/api';
import {addTodoList, setTodoLists} from './todoList-reducer';

const initialState: TasksStateType = {}

export const taskReducer = (state = initialState, action: TaskActionType): TasksStateType => {
    switch (action.type) {
        case 'TODOLIST/SET-TODO-LISTS':
            const copyState = {...state}
            action.todoLists.forEach(t => {
                copyState[t.id] = []
            })
            return copyState
        case 'TODOLIST/ADD-TODO-LIST':
            return {
                [action.todoList.id]: [],
                ...state
            }
        case 'TASK/SET-TASKS':
            return {
                ...state,
                [action.todoListId]: action.tasks
            }
        case 'TASK/ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case 'TASK/REMOVE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .filter(t => t.id !== action.taskId)
            }
        case 'TASK/CHANGE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        default:
            return state
    }
}

//actions
export const setTasks = (todoListId: string, tasks: TaskType[]) => ({
    type: 'TASK/SET-TASKS',
    todoListId,
    tasks
} as const)
export const addTask = (task: TaskType) => ({type: 'TASK/ADD-TASK', task} as const)
export const removeTask = (todoListId: string, taskId: string) => ({
    type: 'TASK/REMOVE-TASK',
    todoListId,
    taskId
} as const)
export const changeTask = (todoListId: string, taskId: string, model: UpdateTaskModelType) => ({
    type: 'TASK/CHANGE-TASK',
    todoListId,
    taskId,
    model
} as const)


//types
export type TaskActionType = ReturnType<typeof setTodoLists>
    | ReturnType<typeof addTodoList>
    | ReturnType<typeof setTasks>
    | ReturnType<typeof addTask>
    | ReturnType<typeof removeTask>
    | ReturnType<typeof changeTask>

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type ModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

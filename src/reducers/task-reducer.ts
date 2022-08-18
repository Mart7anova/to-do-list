import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from '../api/api';
import {AppThunk, RootStateType} from '../store/store';
import {addTodoList, setTodoLists} from './todoList-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

const initialState: TasksStateType = {}

export const taskReducer = (state = initialState, action: TaskActionType): TasksStateType => {
    switch (action.type){
        case 'SET-TODO-LISTS':
            const copyState = {...state}
            action.todoLists.forEach(t => {
                copyState[t.id] = []
            })
            return copyState
        case 'ADD-TODO-LIST':
            return {
                [action.todoList.id]: [],
                ...state
            }
        case 'SET-TASKS':
            return {
                ...state,
                [action.todoListId]: action.tasks}
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .filter(t => t.id !== action.taskId)}
        case 'CHANGE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)}
        default: return state
    }
}
//actions
export const setTasks = (todoListId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todoListId, tasks} as const)
export const addTask = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const removeTask = (todoListId: string, taskId: string) => ({type: 'REMOVE-TASK', todoListId, taskId} as const)
export const changeTask = (todoListId: string, taskId: string, model: UpdateTaskModelType) => ({type: 'CHANGE-TASK', todoListId, taskId, model} as const)

//thunks
export const fetchTasks = (todoListId: string): AppThunk => dispatch => {
    taskAPI.getTasks(todoListId)
        .then(res => {
            if(res.data.error === null){
                dispatch(setTasks(todoListId, res.data.items))
            }
        })
        .catch(e=>{
            handleServerNetworkError(e, dispatch)
        })
}

export const createTask = (todoListId: string, title: string): AppThunk => dispatch =>{
    taskAPI.createTask(todoListId, title)
        .then(res=>{
            if(res.data.resultCode === 0){
                dispatch(addTask(res.data.data.item))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e=>{
            handleServerNetworkError(e, dispatch)
        })
}

export const deleteTask = (todoListId: string, taskId: string): AppThunk => dispatch =>{
    taskAPI.deleteTask(todoListId, taskId)
        .then(res=>{
            if(res.data.resultCode === 0){
                dispatch(removeTask(todoListId, taskId))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e=>{
            handleServerNetworkError(e, dispatch)
        })
}

export const updateTask = (todoListId: string, taskId: string, changes:ModelType): AppThunk =>
    (dispatch,
     getState: ()=>RootStateType) =>{
    const state = getState()
    const task = state.task[todoListId].find(t => t.id === taskId)
    if(!task){
        console.log('task not found in the state')
        return
    }

    const model: UpdateTaskModelType ={
        ...task,
        ...changes
    }

    taskAPI.updateTask(todoListId, taskId, model)
        .then(res=>{
            if(res.data.resultCode === 0){
                dispatch(changeTask(todoListId, taskId, model))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e=>{
            handleServerNetworkError(e, dispatch)
        })
}

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

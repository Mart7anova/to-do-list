import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from '../api/api';
import {AppThunk, RootStateType} from '../store/store';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {setRequestStatus} from './app-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {addTodoList, removeTodoList, setTodoLists} from './todoList-reducer';

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<{ todoListId: string, tasks: TaskType[] }>) {
            state[action.payload.todoListId] = action.payload.tasks
        },
        addTask(state, action: PayloadAction<TaskType>) {
            state[action.payload.todoListId].unshift(action.payload)
        },
        removeTask(state, action: PayloadAction<{ todoListId: string, taskId: string }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(s => s.id === action.payload.taskId)
            tasks.splice(index, 1)
        },
        changeTask(state, action: PayloadAction<{ todoListId: string, taskId: string, model: UpdateTaskModelType }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(s => s.id === action.payload.taskId)
            tasks[index] = {...tasks[index], ...action.payload.model}
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setTodoLists,(state,action)=>{
            action.payload.forEach(s => state[s.id] = [])
        })
        builder.addCase(addTodoList,(state,action)=>{
            state[action.payload.id] = []
        })
        builder.addCase(removeTodoList,(state,action)=>{
            delete state[action.payload]
        })
    }
})
export const taskReducer = slice.reducer
export const {
    setTasks,
    addTask,
    removeTask,
    changeTask,
} = slice.actions

//thunks
export const fetchTasks = (todoListId: string): AppThunk => dispatch => {
    dispatch(setRequestStatus('loading'))
    taskAPI.getTasks(todoListId)
        .then(res => {
            if (res.data.error === null) {
                dispatch(setTasks({todoListId, tasks:res.data.items}))
            }
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
        .finally(() => {
            dispatch(setRequestStatus('succeeded'))
        })
}

export const createTask = (todoListId: string, title: string): AppThunk => dispatch => {
    dispatch(setRequestStatus('loading'))
    taskAPI.createTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTask(res.data.data.item))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
        .finally(() => {
            dispatch(setRequestStatus('succeeded'))
        })
}

export const deleteTask = (todoListId: string, taskId: string): AppThunk => dispatch => {
    dispatch(setRequestStatus('loading'))
    taskAPI.deleteTask(todoListId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTask({todoListId, taskId}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
        .finally(() => {
            dispatch(setRequestStatus('succeeded'))
        })
}

export const updateTask = (todoListId: string, taskId: string, changes: ModelType): AppThunk =>
    (dispatch,
     getState: () => RootStateType) => {
        const state = getState()
        const task = state.task[todoListId].find(t => t.id === taskId)
        if (!task) {
            console.log('task not found in the state')
            return
        }

        const model: UpdateTaskModelType = {
            ...task,
            ...changes
        }
        dispatch(setRequestStatus('loading'))
        taskAPI.updateTask(todoListId, taskId, model)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTask({todoListId, taskId, model}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(e => {
                handleServerNetworkError(e, dispatch)
            })
            .finally(() => {
                dispatch(setRequestStatus('succeeded'))
            })
    }

//types

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

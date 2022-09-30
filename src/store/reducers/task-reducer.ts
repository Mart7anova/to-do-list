import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from '../../api/api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {setRequestStatus} from './app-reducer';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {addTodoList, removeTodoList, setTodoLists} from './todoList-reducer';
import {AxiosError} from 'axios';
import {AppRootStateType} from '../store';


export const fetchTasks = createAsyncThunk('tasks/fetchTasks',
    async (todoListId: string, thunkAPI) => {
        thunkAPI.dispatch(setRequestStatus('loading'))
        try {
            const res = await taskAPI.getTasks(todoListId)
            if (res.data.error === null) {
                return {todoListId, tasks: res.data.items}
            } else {
                return thunkAPI.rejectWithValue({})
            }
        } catch (e) {
            const error = e as Error | AxiosError<{ error: string }>
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        } finally {
            thunkAPI.dispatch(setRequestStatus('succeeded'))
        }
    })
export const createTask = createAsyncThunk('tasks/createTask',
    async (param: { todoListId: string, title: string }, thunkAPI) => {
        thunkAPI.dispatch(setRequestStatus('loading'))
        try {
            const res = await taskAPI.createTask(param.todoListId, param.title)
            if (res.data.resultCode === 0) {
                return res.data.data.item
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue({})
            }
        } catch (e) {
            const error = e as Error | AxiosError<{ error: string }>
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        } finally {
            thunkAPI.dispatch(setRequestStatus('succeeded'))
        }
    })

export const deleteTask = createAsyncThunk('tasks/deleteTask',
    async (param: { todoListId: string, taskId: string }, thunkAPI) => {
        thunkAPI.dispatch(setRequestStatus('loading'))
        try {
            const res = await taskAPI.deleteTask(param.todoListId, param.taskId)
            if (res.data.resultCode === 0) {
                return {todoListId: param.todoListId, taskId: param.taskId}
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue({})
            }
        } catch (e) {
            const error = e as Error | AxiosError<{ error: string }>
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        } finally {
            thunkAPI.dispatch(setRequestStatus('succeeded'))
        }
    })

export const updateTask = createAsyncThunk('tasks/updateTask',
    async (param: { todoListId: string, taskId: string, model: ModelType }, thunkAPI) => {
        const state = thunkAPI.getState() as AppRootStateType
        const task = state.task[param.todoListId].find(t => t.id === param.taskId)
        if (!task) {
            console.log('task not found in the state')
            return thunkAPI.rejectWithValue({})
        }

        const apiModel: UpdateTaskModelType = {
            ...task,
            ...param.model
        }

        thunkAPI.dispatch(setRequestStatus('loading'))
        try {
            const res = await taskAPI.updateTask(param.todoListId, param.taskId, apiModel)
            if (res.data.resultCode === 0) {
                return param
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue({})
            }
        } catch (e) {
            const error = e as Error | AxiosError<{ error: string }>
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        } finally {
            thunkAPI.dispatch(setRequestStatus('succeeded'))
        }
    })


const slice = createSlice({
    name: 'task',
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todoListId] = action.payload.tasks
        })
        builder.addCase(createTask.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(s => s.id === action.payload?.taskId)
            tasks.splice(index, 1)
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(s => s.id === action.payload.taskId)
            tasks[index] = {...tasks[index], ...action.payload.model}
        })

        //todoList
        builder.addCase(setTodoLists, (state, action) => {
            action.payload.forEach(s => state[s.id] = [])
        })
        builder.addCase(addTodoList, (state, action) => {
            state[action.payload.id] = []
        })
        builder.addCase(removeTodoList, (state, action) => {
            delete state[action.payload]
        })
    }
})

export const taskReducer = slice.reducer


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

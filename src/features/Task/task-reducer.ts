import {TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from '../../api/types';
import {handleServerAppError, handleServerNetworkError} from '../../common/utils/error-utils';
import {appActions} from '../Application/';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {AppRootStateType} from '../../app/store';
import {taskAPI} from '../../api/ToDolist-api';
import {todoListsActions} from '../ToDoList';

const {setAppStatus} = appActions
const {createTodoList, fetchTodoLists, deleteTodoList} = todoListsActions


const fetchTasks = createAsyncThunk('tasks/fetchTasks',
    async (todoListId: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
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
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        }
    })
const createTask = createAsyncThunk('tasks/createTask',
    async (param: { todoListId: string, title: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
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
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        }
    })

const deleteTask = createAsyncThunk('tasks/deleteTask',
    async (param: { todoListId: string, taskId: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
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
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        }
    })

const updateTask = createAsyncThunk('tasks/updateTask',
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

        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
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
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        }
    })

export const asyncActions = {
    fetchTasks,
    createTask,
    deleteTask,
    updateTask
}

export const slice = createSlice({
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
        builder.addCase(fetchTodoLists.fulfilled, (state, action) => {
            action.payload.forEach(s => state[s.id] = [])
        })
        builder.addCase(createTodoList.fulfilled, (state, action) => {
            state[action.payload.id] = []
        })
        builder.addCase(deleteTodoList.fulfilled, (state, action) => {
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

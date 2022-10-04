import {todoListAPI} from '../../api/ToDolist-api';
import {handleServerAppError, handleServerNetworkError} from '../../common/utils/error-utils';
import {appActions} from '../Application';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {TodoListType} from '../../api/types';

const {setAppStatus} = appActions

const fetchTodoLists = createAsyncThunk('todoList/fetchTodoLists',
    async (param, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const res = await todoListAPI.getTodoLists()
            return res.data
        } catch (e) {
            const error = e as Error | AxiosError<{ error: string }>
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        } finally {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        }
    })
const createTodoList = createAsyncThunk('todoList/createTodoList',
    async (title: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const res = await todoListAPI.createTodoList(title)
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
const deleteTodoList = createAsyncThunk('todoList/deleteTodoList',
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const res = await todoListAPI.deleteTodoList(id)
            if (res.data.resultCode === 0) {
                return id
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
const updateTodoListTitle = createAsyncThunk('todoList/updateTodoListTitle',
    async (param: { id: string, title: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const res = await todoListAPI.updateTodoList(param.id, param.title)
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
    fetchTodoLists,
    createTodoList,
    deleteTodoList,
    updateTodoListTitle
}

export const slice = createSlice({
    name: 'todolist',
    initialState: [] as TodoListStateType[],
    reducers: {
        changeTodoListFilter(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(s => s.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodoLists.fulfilled, (state, action) => {
            return action.payload.map(p => ({...p, filter: 'all'}))
        })
        builder.addCase(createTodoList.fulfilled, (state, action) => {
            state.unshift({...action.payload, filter: 'all'})
        })
        builder.addCase(deleteTodoList.fulfilled, (state, action) => {
            const index = state.findIndex(s => s.id === action.payload)
            state.splice(index, 1)
        })
        builder.addCase(updateTodoListTitle.fulfilled, (state, action) => {
            const index = state.findIndex(s => s.id === action.payload.id)
            state[index].title = action.payload.title
        })
    }
})


export type TodoListStateType = TodoListType & {
    filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'active' | 'completed'
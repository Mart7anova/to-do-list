import {todoListAPI, TodoListType} from '../../api/api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {setRequestStatus} from './app-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';


export const fetchTodoLists = createAsyncThunk('todoList/fetchTodoLists',
    async (param, thunkAPI) => {
        thunkAPI.dispatch(setRequestStatus('loading'))
        try {
            const res = await todoListAPI.getTodoLists()
            return res.data
        } catch (e) {
            const error = e as Error | AxiosError<{ error: string }>
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        } finally {
            thunkAPI.dispatch(setRequestStatus('succeeded'))
        }
    })
export const createTodoList = createAsyncThunk('todoList/createTodoList',
    async (title: string, thunkAPI) => {
        thunkAPI.dispatch(setRequestStatus('loading'))
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
            thunkAPI.dispatch(setRequestStatus('succeeded'))
        }
    })
export const deleteTodoList = createAsyncThunk('todoList/deleteTodoList',
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(setRequestStatus('loading'))
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
            thunkAPI.dispatch(setRequestStatus('succeeded'))
        }
    })
export const updateTodoListTitle = createAsyncThunk('todoList/updateTodoListTitle',
    async (param: { id: string, title: string }, thunkAPI) => {
        thunkAPI.dispatch(setRequestStatus('loading'))
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
            thunkAPI.dispatch(setRequestStatus('succeeded'))
        }
    })


const slice = createSlice({
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
export const todoListReducer = slice.reducer
export const {
    changeTodoListFilter,
} = slice.actions


export type TodoListStateType = TodoListType & {
    filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'active' | 'completed'
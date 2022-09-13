import {todoListAPI, TodoListType} from '../api/api';
import {AppThunk} from '../store/store';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {setRequestStatus} from './app-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: TodoListStateType[] = []

const slice = createSlice({
    name: 'todolist',
    initialState,
    reducers: {
        setTodoLists(state, action: PayloadAction<TodoListType[]>) {
            return action.payload.map(p => ({...p, filter: 'all'}))
        },
        addTodoList(state, action: PayloadAction<TodoListType>) {
            state.unshift({...action.payload, filter: 'all'})
        },
        removeTodoList(state, action: PayloadAction<string>) {
            const index = state.findIndex(s => s.id === action.payload)
            state.splice(index, 1)
        },
        changeTodoListTitle(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(s => s.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodoListFilter(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(s => s.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
    }
})
export const todoListReducer = slice.reducer
export const {
    setTodoLists,
    addTodoList,
    removeTodoList,
    changeTodoListTitle,
    changeTodoListFilter,
} = slice.actions

//thunks
export const fetchTodoLists = (): AppThunk => dispatch => {
    dispatch(setRequestStatus('loading'))
    todoListAPI.getTodoLists()
        .then(res => {
            dispatch(setTodoLists(res.data))
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
        .finally(() => {
            dispatch(setRequestStatus('succeeded'))
        })
}

export const createTodoList = (title: string): AppThunk => dispatch => {
    dispatch(setRequestStatus('loading'))
    todoListAPI.createTodoList(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoList(res.data.data.item))
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

export const deleteTodoList = (id: string): AppThunk => dispatch => {
    dispatch(setRequestStatus('loading'))
    todoListAPI.deleteTodoList(id)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoList(id))
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

export const updateTodoList = (id: string, title: string): AppThunk => dispatch => {
    dispatch(setRequestStatus('loading'))
    todoListAPI.updateTodoList(id, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitle({id, title}))
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

export type TodoListStateType = TodoListType & {
    filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'active' | 'completed'
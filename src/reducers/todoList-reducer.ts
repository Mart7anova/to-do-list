import {todoListAPI, TodoListType} from '../api/api';
import {AppThunk} from '../store/store';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

const initialState: TodoListStateType[] = []

export const todoListReducer = (state: TodoListStateType[] = initialState, action: todoListActionType): TodoListStateType[] => {
    switch (action.type) {
        case 'SET-TODO-LISTS':
            return action.todoLists.map(t => ({...t, filter: 'all'}))
        case 'ADD-TODO-LIST':
            return [{...action.todoList, filter: 'all'}, ...state,]
        case 'REMOVE-TODO-LIST':
            return state.filter(t => t.id !== action.id)
        case 'CHANGE-TODO-LIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case 'CHANGE-TODO-LIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        default:
            return state
    }
}
//actions
export const setTodoLists = (todoLists: TodoListType[]) => ({type: 'SET-TODO-LISTS', todoLists} as const)
export const addTodoList = (todoList: TodoListType) => ({type: 'ADD-TODO-LIST', todoList} as const)
export const removeTodoList = (id: string) => ({type: 'REMOVE-TODO-LIST', id} as const)
export const changeTodoListTitle = (id: string, title: string) => ({type: 'CHANGE-TODO-LIST-TITLE', id, title} as const)
export const changeTodoListFilter = (id: string, filter: FilterValuesType) => (
    {type: 'CHANGE-TODO-LIST-FILTER', id, filter} as const
)

//thunks
export const fetchTodoLists = (): AppThunk => dispatch => {
    todoListAPI.getTodoLists()
        .then(res => {
            dispatch(setTodoLists(res.data))
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
}

export const createTodoList = (title: string): AppThunk => dispatch => {
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
}

export const deleteTodoList = (id: string): AppThunk => dispatch => {
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
}

export const updateTodoList = (id: string, title: string): AppThunk => dispatch => {
    todoListAPI.updateTodoList(id, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitle(id, title))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
}

//types
export type todoListActionType = ReturnType<typeof setTodoLists>
    | ReturnType<typeof addTodoList>
    | ReturnType<typeof removeTodoList>
    | ReturnType<typeof changeTodoListTitle>
    | ReturnType<typeof changeTodoListFilter>

export type TodoListStateType = TodoListType & {
    filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'active' | 'completed'
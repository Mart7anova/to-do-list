import {todoListAPI, TodoListType} from '../api/api';
import {AppThunk} from '../App/store';

const initialState: TodoListType[] = []

export const todoListReducer = (state = initialState, action: todoListActionType): TodoListType[] => {
    switch (action.type) {
        case 'SET-TODO-LISTS':
            return action.todoLists.map(t => t)
        case 'ADD-TODO-LIST':
            return [{...action.todoList}, ...state,]
        case 'REMOVE-TODO-LIST':
            return state.filter(t => t.id !== action.id)
        case 'CHANGE-TODO-LIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        default:
            return state
    }
}

export const setTodoLists = (todoLists: TodoListType[]) => ({type: 'SET-TODO-LISTS', todoLists} as const)
export const addTodoList = (todoList: TodoListType) => ({type: 'ADD-TODO-LIST', todoList} as const)
export const removeTodoList = (id: string) => ({type: 'REMOVE-TODO-LIST', id} as const)
export const changeTodoList = (id: string, title: string) => ({type: 'CHANGE-TODO-LIST-TITLE', id, title} as const)

export const fetchTodoLists = (): AppThunk => dispatch => {
    todoListAPI.getTodoLists()
        .then(res => {
            dispatch(setTodoLists(res.data))
        })
        .catch(e => {

        })
}

export const createTodoList = (title: string): AppThunk => dispatch => {
    todoListAPI.createTodoList(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoList(res.data.data.item))
            } else {

            }
        })
}

export const deleteTodoList = (id: string): AppThunk => dispatch => {
    todoListAPI.deleteTodoList(id)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoList(id))
            } else {

            }
        })
}

export const updateTodoList = (id: string, title: string): AppThunk => dispatch => {
    todoListAPI.updateTodoList(id, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoList(id, title))
            } else {

            }
        })
}

//types
export type todoListActionType = ReturnType<typeof setTodoLists>
    | ReturnType<typeof addTodoList>
    | ReturnType<typeof removeTodoList>
    | ReturnType<typeof changeTodoList>

import {todolistAPI, TodolistType} from '../api/api';
import {AppThunk} from '../App/store';

const initialState: TodolistType[] = []

export const todolistReducer = (state = initialState, action: todolistActionType): TodolistType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(t=>t)

        default:
            return state
    }
}

const setTodolists = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists})

export const fetchTodolists = (): AppThunk => (dispatch) => {
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setTodolists(res.data))
        })
        .catch(e=>{

        })
}

//types
export type todolistActionType = setTodolistsAT

type setTodolistsAT = ReturnType<typeof setTodolists>

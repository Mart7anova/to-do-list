import {todolistAPI, TodoListType} from '../api/api';
import {AppThunk} from '../App/store';

const initialState: TodoListType[] = []

export const todoListReducer = (state = initialState, action: todoListActionType): TodoListType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todoLists.map(t=>t)

        default:
            return state
    }
}

const setTodoLists = (todoLists: TodoListType[]) => ({type: 'SET-TODOLISTS', todoLists})

export const fetchTodoLists = (): AppThunk => (dispatch) => {
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setTodoLists(res.data))
        })
        .catch(e=>{

        })
}

//types
export type todoListActionType = setTodoListsAT

type setTodoListsAT = ReturnType<typeof setTodoLists>

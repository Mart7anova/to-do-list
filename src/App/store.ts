import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {todoListActionType, todoListReducer} from '../TodoList/todoList-reducer';

const rootReducer = combineReducers({
    todoList: todoListReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppStateType = ReturnType<typeof rootReducer>

export type AppActionType = todoListActionType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionType>
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AppActionType>


// @ts-ignore
window.store = store;
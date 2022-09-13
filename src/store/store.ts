import {combineReducers} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {todoListActionType, todoListReducer} from '../reducers/todoList-reducer';
import {TaskActionType, taskReducer} from '../reducers/task-reducer';
import {AppActionType, appReducer} from '../reducers/app-reducer';
import {AuthActionType, authReducer} from '../reducers/auth-reducer';
import {configureStore} from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    app:appReducer,
    auth: authReducer,
    todoList: todoListReducer,
    task: taskReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
});

export type RootSReducerType = typeof rootReducer
export type RootStateType = ReturnType<RootSReducerType>

export type RootActionType = todoListActionType | TaskActionType | AuthActionType | AppActionType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, RootActionType>
export type AppDispatch = ThunkDispatch<RootStateType, unknown, RootActionType>


// @ts-ignore
window.store = store;
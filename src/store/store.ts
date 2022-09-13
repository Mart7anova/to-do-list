import {AnyAction, combineReducers} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {todoListReducer} from '../reducers/todoList-reducer';
import {taskReducer} from '../reducers/task-reducer';
import {appReducer} from '../reducers/app-reducer';
import {authReducer} from '../reducers/auth-reducer';
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

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AnyAction>
export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction>


// @ts-ignore
window.store = store;
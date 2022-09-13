import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {todoListActionType, todoListReducer} from '../reducers/todoList-reducer';
import {TaskActionType, taskReducer} from '../reducers/task-reducer';
import {AppActionType, appReducer} from '../reducers/app-reducer';
import {AuthActionType, authReducer} from '../reducers/auth-reducer';

const rootReducer = combineReducers({
    app:appReducer,
    auth: authReducer,
    todoList: todoListReducer,
    task: taskReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type RootSReducerType = typeof rootReducer
export type RootStateType = ReturnType<RootSReducerType>

export type RootActionType = todoListActionType | TaskActionType | AuthActionType | AppActionType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, RootActionType>
export type AppDispatch = ThunkDispatch<RootStateType, unknown, RootActionType>


// @ts-ignore
window.store = store;
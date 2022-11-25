import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {todoListActionType, todoListReducer} from './reducers/todoList-reducer';
import {TaskActionType, taskReducer} from './reducers/task-reducer';
import {AppActionType, appReducer} from './reducers/app-reducer';
import {AuthActionType, authReducer} from './reducers/auth-reducer';
import createSagaMiddleware from 'redux-saga'
import {taskWatcher} from "./sagas/task-sagas";
import {appWatcher} from "./sagas/app-sagas";
import {todoListWatcher} from "./sagas/todoList-sagas";
import {authWatcher} from "./sagas/auth-sagas";
import {fork} from "redux-saga/effects";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    todoList: todoListReducer,
    task: taskReducer
})

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, sagaMiddleware))

sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    yield fork(appWatcher)
    yield fork(authWatcher)
    yield fork(todoListWatcher)
    yield fork(taskWatcher)
}

export type RootReducerType = typeof rootReducer
export type RootStateType = ReturnType<RootReducerType>

export type RootActionType = todoListActionType | TaskActionType | AuthActionType | AppActionType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, RootActionType>
export type AppDispatch = ThunkDispatch<RootStateType, unknown, RootActionType>


// @ts-ignore
window.store = store;
import {todoListReducer} from './reducers/todoList-reducer';
import {taskReducer} from './reducers/task-reducer';
import {appReducer} from './reducers/app-reducer';
import {authReducer} from './reducers/auth-reducer';
import {configureStore} from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        app:appReducer,
        auth: authReducer,
        todoList: todoListReducer,
        task: taskReducer
    },
});

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


// @ts-ignore
window.store = store;
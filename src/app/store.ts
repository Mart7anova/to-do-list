import {todoListReducer} from '../features/ToDoList';
import {taskReducer} from '../features/Task/task-reducer';
import {authReducer} from '../features/Auth';
import {configureStore} from '@reduxjs/toolkit'
import {appReducer} from '../features/Application';

export const store = configureStore({
    reducer: {
        app:appReducer,
        auth: authReducer,
        todoList: todoListReducer,
        task: taskReducer
    },
});

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch


// @ts-ignore
window.store = store;
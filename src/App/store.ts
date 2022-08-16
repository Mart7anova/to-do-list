import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {todoListActionType, todoListReducer} from '../TodoList/todoList-reducer';
import {TaskActionType, taskReducer} from '../TodoList/Task/task-reducer';

const rootReducer = combineReducers({
    todoList: todoListReducer,
    task: taskReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppStateType = ReturnType<typeof rootReducer>

export type AppActionType = todoListActionType | TaskActionType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionType>
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AppActionType>


// @ts-ignore
window.store = store;
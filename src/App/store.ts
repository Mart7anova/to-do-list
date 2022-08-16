import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {todolistActionType, todolistReducer} from '../Todolist/todolist-reducer';

const rootReducer = combineReducers({
    todolist: todolistReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppStateType = ReturnType<typeof rootReducer>

export type AppActionType = todolistActionType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionType>
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AppActionType>


// @ts-ignore
window.store = store;
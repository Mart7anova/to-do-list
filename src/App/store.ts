import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';

const rootReducer = combineReducers({

})

export const store = createStore(rootReducer, applyMiddleware(thunk))


export type AppRootStateType = ReturnType<typeof rootReducer>
/*export type AppActionType = {}
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionType>*/


// @ts-ignore
window.store = store;
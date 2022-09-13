import {AppThunk} from '../store/store';
import {authAPI} from '../api/api';
import {handleServerNetworkError} from '../utils/error-utils';
import {setIsLoggedIn} from './auth-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: initialAppStateType = {
    //авторизация пользователя
    isInitialized: false,
    //глобальная ошибка (например: некорр запрос)
    error: null,
    //статус при взаимодействии с сервером
    requestStatus: 'idle'
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsInitialized(state,action: PayloadAction<boolean>){
            state.isInitialized = action.payload
        },
        setAppError(state,action: PayloadAction<ErrorType>){
            state.error = action.payload
        },
        setRequestStatus(state,action: PayloadAction<RequestStatusType>){
            state.requestStatus = action.payload
        },
    }
})
export const appReducer = slice.reducer
export const {
    setIsInitialized,
    setAppError,
    setRequestStatus
} = slice.actions

//thunks
export const initializeApp = (): AppThunk => dispatch => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
            }
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitialized(true))
        })
}

//types

export type initialAppStateType = {
    isInitialized: boolean
    error: ErrorType
    requestStatus: RequestStatusType
}
type ErrorType = null | string

type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
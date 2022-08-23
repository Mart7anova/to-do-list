import {AppThunk} from '../store/store';
import {authAPI} from '../api/api';
import {handleServerNetworkError} from '../utils/error-utils';
import {setIsLoggedIn} from './auth-reducer';

const initialState: initialAppStateType = {
    //авторизация пользователя
    isInitialized: false,
    //глобальная ошибка (например: некорр запрос)
    error: null,
    //статус при взаимодействии с сервером
    requestStatus: 'idle'
}

export const appReducer = (state: initialAppStateType = initialState, action: AppActionType): initialAppStateType => {
    switch (action.type) {
        case 'SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        case 'SET-APP-ERROR':
            return {...state, error: action.error}
        case 'SET-REQUEST-STATUS':
            return {...state, requestStatus: action.value}
        default:
            return state
    }
}
//actions
export const setIsInitialized = (value: boolean) => ({type: 'SET-IS-INITIALIZED', value} as const)
export const setAppError = (error: ErrorType) => ({type: 'SET-APP-ERROR', error} as const)
export const setRequestStatus = (value: RequestStatusType) => ({type: 'SET-REQUEST-STATUS', value} as const)

//thunks
export const initializeApp = (): AppThunk => dispatch => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
            }
        })
        .catch(e=>{
            handleServerNetworkError(e, dispatch)
        })
        .finally(()=>{
            dispatch(setIsInitialized(true))
        })
}

//types
export type AppActionType = ReturnType<typeof setIsInitialized>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setRequestStatus>

export type ErrorStatus = ReturnType<typeof setAppError> | ReturnType<typeof setRequestStatus>

export type initialAppStateType = {
    isInitialized: boolean
    error: ErrorType
    requestStatus: RequestStatusType
}
type ErrorType = null | string

type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
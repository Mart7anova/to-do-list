import {AppThunk} from '../store/store';
import {authAPI, LoginParamsType} from '../api/api';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {setRequestStatus} from './app-reducer';

const initialState = {
    //Аутентификация пользователя
    isLoggedIn: false
}

export const authReducer = (state: initialAuthStateType = initialState, action: AuthActionType): initialAuthStateType => {
    switch (action.type){
        case 'SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default: return state
    }
}
//actions
export const setIsLoggedIn = (value: boolean) => ({type: 'SET-IS-LOGGED-IN',value} as const)

//thunks
export const login = (data: LoginParamsType): AppThunk => dispatch =>{
    dispatch(setRequestStatus('loading'))
    authAPI.login(data)
        .then(res=>{
            if(res.data.resultCode === 0){
                dispatch(setIsLoggedIn(true))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e=>{
            handleServerNetworkError(e, dispatch)
        })
        .finally(()=>{
            dispatch(setRequestStatus('succeeded'))
        })
}

export const logout = (): AppThunk => dispatch =>{
    dispatch(setRequestStatus('loading'))
    authAPI.logout()
        .then(res=>{
            if(res.data.resultCode === 0){
                dispatch(setIsLoggedIn(false))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e=>{
            handleServerNetworkError(e, dispatch)
        })
        .finally(()=>{
            dispatch(setRequestStatus('succeeded'))
        })
}

//types
export type AuthActionType = ReturnType<typeof setIsLoggedIn>

export type initialAuthStateType = typeof initialState


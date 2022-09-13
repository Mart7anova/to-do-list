import {AppThunk} from '../store/store';
import {authAPI, LoginParamsType} from '../api/api';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {setRequestStatus} from './app-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    //Аутентификация пользователя
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setIsLoggedIn(state, action: PayloadAction<boolean>){
            state.isLoggedIn = action.payload
        }
    }
})
export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions

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


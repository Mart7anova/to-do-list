import {AppThunk} from '../App/store';
import {authAPI, LoginParamsType} from '../api/api';

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: initialStateType = initialState, action: AuthActionType): initialStateType => {
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
    authAPI.login(data)
        .then(res=>{
            if(res.data.resultCode === 0){
                dispatch(setIsLoggedIn(true))
            }
        })
}

export const logout = (): AppThunk => dispatch =>{
    authAPI.logout()
        .then(res=>{
            if(res.data.resultCode === 0){
                dispatch(setIsLoggedIn(false))
            }
        })
}

//types
export type AuthActionType = ReturnType<typeof setIsLoggedIn>

export type initialStateType = typeof initialState


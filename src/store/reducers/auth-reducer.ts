const initialState = {
    //Аутентификация пользователя
    isLoggedIn: false
}

export const authReducer = (state: initialAuthStateType = initialState, action: AuthActionType): initialAuthStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
//actions
export const setIsLoggedIn = (value: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', value} as const)

//types
export type AuthActionType = ReturnType<typeof setIsLoggedIn>

export type initialAuthStateType = typeof initialState


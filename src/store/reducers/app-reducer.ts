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
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        case 'APP/SET-APP-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-REQUEST-STATUS':
            return {...state, requestStatus: action.value}
        default:
            return state
    }
}

//actions
export const setIsInitialized = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)
export const setAppError = (error: ErrorType) => ({type: 'APP/SET-APP-ERROR', error} as const)
export const setRequestStatus = (value: RequestStatusType) => ({type: 'APP/SET-REQUEST-STATUS', value} as const)


//types
export type AppActionType =
    | ReturnType<typeof setIsInitialized>
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
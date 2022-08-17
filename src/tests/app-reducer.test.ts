import {
    appReducer,
    initialAppStateType,
    setAppError,
    setIsInitialized,
    setRequestStatus
} from '../reducers/app-reducer';

let startState:initialAppStateType = {
    isInitialized: false,
    error: null,
    requestStatus: 'idle'
}

beforeEach(() => {
    startState = {
        isInitialized: false,
        error: null,
        requestStatus: 'idle'
    }
})

test('Authorization must be completed', () => {
    const endState = appReducer(startState, setIsInitialized(true))

    expect(endState.isInitialized).toBe(true)
})

test('An error must be set', () => {
    const endState = appReducer(startState, setAppError('Test error'))

    expect(endState.error).toBe('Test error')
})

test('The status of the request must be changed', () => {
    const endState = appReducer(startState, setRequestStatus('loading'))

    expect(endState.requestStatus).toBe('loading')
})
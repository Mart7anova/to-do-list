import {
    appReducer, ErrorType, initializeApp, RequestStatusType,
    setAppError,
    setRequestStatus
} from '../../store/reducers/app-reducer';

let startState = {
    isInitialized: false,
    error: null as ErrorType,
    requestStatus: 'idle' as RequestStatusType,
}

beforeEach(() => {
    startState = {
        isInitialized: false,
        error: null,
        requestStatus: 'idle'
    }
})

test('Authorization must be completed', () => {
    const endState = appReducer(startState, initializeApp.fulfilled(undefined, 'requestID', undefined))

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
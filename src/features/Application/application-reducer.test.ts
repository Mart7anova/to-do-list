import {ErrorType, StatusType,} from './application-reducer';
import {appActions} from './index'
import {appReducer} from './index'

const {initializeApp, setAppError, setAppStatus} = appActions

let startState = {
    isInitialized: false,
    error: null as ErrorType,
    status: 'idle' as StatusType,
}

beforeEach(() => {
    startState = {
        isInitialized: false,
        error: null,
        status: 'idle'
    }
})

test('Authorization must be completed', () => {
    const endState = appReducer(startState, initializeApp.fulfilled(undefined, 'requestID', undefined))

    expect(endState.isInitialized).toBe(true)
})

test('An error must be set', () => {
    const endState = appReducer(startState, setAppError({error: 'Test error'}))

    expect(endState.error).toBe('Test error')
})

test('The status of the request must be changed', () => {
    const endState = appReducer(startState, setAppStatus({status: 'loading'}))

    expect(endState.status).toBe('loading')
})
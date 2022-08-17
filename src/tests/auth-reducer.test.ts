import {authReducer, initialAuthStateType, setIsLoggedIn} from '../reducers/auth-reducer';

const startState = {
    isLoggedIn: false
} as initialAuthStateType

test('Authentication must be completed', () => {
    const endState = authReducer(startState, setIsLoggedIn(true))

    expect(endState.isLoggedIn).toBe(true)
})


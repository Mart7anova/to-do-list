import {authReducer, initialStateType, setIsLoggedIn} from '../reducers/auth-reducer';

const startState = {
    isLoggedIn: false
} as initialStateType

test('The state of the isLoggedIn should change', () => {
    const endState = authReducer(startState, setIsLoggedIn(true))

    expect(endState.isLoggedIn).toBe(true)
})


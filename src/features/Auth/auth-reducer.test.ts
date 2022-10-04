import {authActions, authReducer} from './index';

const startState = {
    isLoggedIn: false
}

test('Authentication must be completed', () => {
    const endState = authReducer(startState, authActions.setIsLoggedIn(true))

    expect(endState.isLoggedIn).toBe(true)
})


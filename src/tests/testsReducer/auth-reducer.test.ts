import {authReducer, setIsLoggedIn} from '../../store/reducers/auth-reducer';

const startState = {
    isLoggedIn: false
}

test('Authentication must be completed', () => {
    const endState = authReducer(startState, setIsLoggedIn(true))

    expect(endState.isLoggedIn).toBe(true)
})


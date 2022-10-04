import {asyncAction, slice} from './auth-reducer';
import * as authSelectors from './selectors'

const authReducer = slice.reducer

const authActions = {
    ...asyncAction,
    ...slice.actions
}

export {
    authReducer,
    authActions,
    authSelectors,
}
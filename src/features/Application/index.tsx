import * as appSelectors from './selectors'
import {asyncActions, StatusType, slice} from './application-reducer';
import {createAction} from '@reduxjs/toolkit'

const appReducer = slice.reducer

const setAppStatus = createAction<{ status: StatusType }>('appActions/setAppStatus')
const setAppError = createAction<{ error: string | null }>('appActions/setAppError')

const appActions = {
    ...asyncActions,
    ...slice.actions,
    setAppStatus,
    setAppError
}

export type RequestStatusType = StatusType

export {
    appReducer,
    appActions,
    appSelectors,
}

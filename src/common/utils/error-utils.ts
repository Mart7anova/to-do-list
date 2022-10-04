import {ResponseType} from '../../api/types';
import {appActions} from '../../features/Application';
import {Dispatch} from 'redux';

export const handleServerAppError = <D>(data: ResponseType<D>,
                                        dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(appActions.setAppError({error: data.messages[0]}))
    }else {
        dispatch(appActions.setAppError({error: 'Some error'}))
    }
    dispatch(appActions.setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (error: { message: string },
                                         dispatch: Dispatch) => {
    dispatch(appActions.setAppError({error: error.message ? error.message : 'Some error occurred'}))
    dispatch(appActions.setAppStatus({status: 'failed'}))
}
import {ResponseType} from '../api/api';
import {ErrorStatus, setAppError, setRequestStatus} from '../reducers/app-reducer';
import {Dispatch} from 'redux';


export const handleServerAppError = <D>(data: ResponseType<D>,
                                        dispatch: Dispatch<ErrorStatus>) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    }else {
        dispatch(setAppError('Some error'))
    }
    dispatch(setRequestStatus('failed'))
}
export const handleServerNetworkError = (error: { message: string },
                                         dispatch: Dispatch<ErrorStatus>) => {
    dispatch(setAppError(error.message ? error.message : 'Some error occurred'))
    dispatch(setRequestStatus('failed'))
}
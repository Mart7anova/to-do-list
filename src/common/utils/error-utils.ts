import {ResponseType} from '../../api/api';
import {setAppError} from '../../store/reducers/app-reducer';


export const handleServerAppError = <D>(data: ResponseType<D>) => {
    if (data.messages.length) {
        return setAppError(data.messages[0])
    } else {
        return setAppError('Some error')
    }
}

export const handleServerNetworkError = (error: { message: string }) => {
    return setAppError(error.message ? error.message : 'Some error occurred')
}
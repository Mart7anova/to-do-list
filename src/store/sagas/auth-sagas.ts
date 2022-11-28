import {authAPI, LoginParamsType, ResponseType} from "../../api/api";
import {call, put, takeEvery} from "redux-saga/effects";
import {setRequestStatus} from "../reducers/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setIsLoggedIn} from "../reducers/auth-reducer";
import {ServerNetworkError} from "../../common/types/ServerNetworkError";
import {AxiosResponse} from "axios";

//actions
export const login = (dataForLogin: LoginParamsType) => ({type: 'AUTH/LOGIN', dataForLogin})
export const logout = () => ({type: 'AUTH/LOGOUT'})


//Worker Saga
export function* loginWS({dataForLogin}: ReturnType<typeof login>) {
    yield put(setRequestStatus('loading'))
    try {
        const {data}: AxiosResponse<ResponseType<{ userId: number }>> = yield call(authAPI.login, dataForLogin)
        if (data.resultCode === 0) {
            yield put(setIsLoggedIn(true))
        } else {
            yield put(handleServerAppError(data))
        }
    } catch (e) {
        yield put(handleServerNetworkError(e as ServerNetworkError))
    } finally {
        yield put(setRequestStatus('succeeded'))
    }
}

export function* logoutWS() {
    yield put(setRequestStatus('loading'))
    try {
        const {data}: AxiosResponse<ResponseType> = yield call(authAPI.logout)
        if (data.resultCode === 0) {
            yield put(setIsLoggedIn(false))
        } else {
            yield put(handleServerAppError(data))
        }
    } catch (e) {
        yield put(handleServerNetworkError(e as ServerNetworkError))
    } finally {
        yield put(setRequestStatus('succeeded'))
    }
}

//Watcher Saga
export function* authWatcher() {
    yield takeEvery('AUTH/LOGIN', loginWS)
    yield takeEvery('AUTH/LOGOUT', logoutWS)
}
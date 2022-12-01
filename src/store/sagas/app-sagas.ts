import {call, put, takeEvery} from "redux-saga/effects";
import {authAPI, MeType, ResponseType} from "../../api/api";
import {setIsLoggedIn} from "../reducers/auth-reducer";
import {handleServerNetworkError} from "../../common/utils/error-utils";
import {ServerNetworkError} from "../../common/types/ServerNetworkError";
import {setIsInitialized} from "../reducers/app-reducer";

//actions
export const initializeApp = () => ({type: 'APP/INITIALIZE-APP'})

//Worker Saga
export function* initializeAppWS(): any {
    try {
        const data: ResponseType<MeType> = yield call(authAPI.me)
        if (data.resultCode === 0) {
            yield put(setIsLoggedIn(true))
        }
    } catch (e) {
        yield put(handleServerNetworkError(e as ServerNetworkError))
    } finally {
        yield put(setIsInitialized(true))
    }
}

//Watcher Saga
export function* appWatcher() {
    yield takeEvery('APP/INITIALIZE-APP', initializeAppWS)
}
import {initializeAppWS} from "../app-sagas";
import {call, put} from "redux-saga/effects";
import {authAPI, MeType, ResponseType} from "../../../api/api";
import {setIsLoggedIn} from "../../reducers/auth-reducer";
import {setIsInitialized} from "../../reducers/app-reducer";
import {handleServerNetworkError} from "../../../utils/error-utils";
import {ServerNetworkError} from "../../../common/types/ServerNetworkError";

let response: ResponseType<MeType>
let error: Error

beforeEach(() => {
    response = {
        resultCode: 0,
        data: {
            email: '',
            id: 1,
            login: ''
        },
        messages: []
    }
    error = new Error('error')
})

describe('Initialize', ()=>{
    test('Initialize: successful', () => {
        const gen = initializeAppWS()
        expect(gen.next().value).toEqual(call(authAPI.me))
        expect(gen.next(response).value).toEqual(put(setIsLoggedIn(true)))
        expect(gen.next().value).toEqual(put(setIsInitialized(true)))
    })
    test('Initializing: network error', () => {
        const gen = initializeAppWS()
        expect(gen.next().value).toEqual(call(authAPI.me))
        expect(gen.throw({message: 'error'}).value)
            .toEqual(put(handleServerNetworkError(error as ServerNetworkError)))
        expect(gen.next().value).toEqual(put(setIsInitialized(true)))
    })
})
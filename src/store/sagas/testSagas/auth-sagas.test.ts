import {loginWS, logoutWS} from "../auth-sagas";
import {authAPI, LoginParamsType, ResponseType} from "../../../api/api";
import {call, put} from "redux-saga/effects";
import {setRequestStatus} from "../../reducers/app-reducer";
import {setIsLoggedIn} from "../../reducers/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../common/utils/error-utils";
import {ServerNetworkError} from "../../../common/types/ServerNetworkError";

let dataForLogin: LoginParamsType
let loginResponse: ResponseType<{ userId: number }>
let logoutResponse: ResponseType
let error: Error

beforeEach(() => {
    dataForLogin = {
        email: 'email@gmail.com',
        password: '123',
        rememberMe: true
    }
    loginResponse = {
        data: {userId: 1},
        resultCode: 0,
        messages: [],
    }
    logoutResponse = {
        data: {},
        resultCode: 0,
        messages: [],
    }
    error = new Error('error')
})

describe('Login', () => {
    test('Login: successful', () => {
        const gen = loginWS({type: 'AUTH/LOGIN', dataForLogin})
        expect(gen.next().value).toEqual(put(setRequestStatus('loading')))
        expect(gen.next().value).toEqual(call(authAPI.login, dataForLogin))
        expect(gen.next(loginResponse).value).toEqual(put(setIsLoggedIn(true)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
    test('Login: app error', () => {
        const gen = loginWS({type: 'AUTH/LOGIN', dataForLogin})
        gen.next()
        gen.next()
        loginResponse.resultCode = 1
        loginResponse.messages.push('error')
        expect(gen.next(loginResponse).value).toEqual(put(handleServerAppError(loginResponse)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
    test('Login: network error', () => {
        const gen = loginWS({type: 'AUTH/LOGIN', dataForLogin})
        gen.next()
        gen.next()
        expect(gen.throw({message: 'error'}).value)
            .toEqual(put(handleServerNetworkError(error as ServerNetworkError)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
})

describe('Logout', () => {
    test('Logout: successful', () => {
        const gen = logoutWS()
        expect(gen.next().value).toEqual(put(setRequestStatus('loading')))
        expect(gen.next().value).toEqual(call(authAPI.logout))
        expect(gen.next(logoutResponse).value).toEqual(put(setIsLoggedIn(false)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
    test('Logout: app error', () => {
        const gen = logoutWS()
        gen.next()
        gen.next()
        logoutResponse.resultCode = 1
        logoutResponse.messages.push('error')
        expect(gen.next(logoutResponse).value).toEqual(put(handleServerAppError(logoutResponse)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
    test('Logout: network error', () => {
        const gen = logoutWS()
        gen.next()
        gen.next()
        expect(gen.throw({message: 'error'}).value)
            .toEqual(put(handleServerNetworkError(error as ServerNetworkError)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
})
import {call, put} from "redux-saga/effects";
import {setRequestStatus} from "../../reducers/app-reducer";
import {ResponseType, todoListAPI, TodoListType} from "../../../api/api";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {ServerNetworkError} from "../../../common/types/ServerNetworkError";
import {createTodoListWS, deleteTodoListWS, fetchTodoListsWS, updateTodoListWS} from "../todoList-sagas";
import {addTodoList, changeTodoListTitle, removeTodoList, setTodoLists} from "../../reducers/todoList-reducer";


let title: string
let error: Error
let todoList: TodoListType
let id: string
let successResponse: ResponseType
let errorResponse: ResponseType

beforeEach(()=>{
    title = 'Test'
    id = '1'
    todoList = {id, title: 'Test', order: 1, addedDate: ''}
    successResponse = {
        resultCode: 0,
        data: {},
        messages: []
    }
    errorResponse = {
        resultCode: 1,
        data: {},
        messages: ['error']
    }
    error = new Error('error')
})

describe('fetch todoList', () => {
    test('fetch todoList: successful', () => {
        const gen = fetchTodoListsWS()

        expect(gen.next().value).toEqual(put(setRequestStatus('loading')))
        expect(gen.next().value).toEqual(call(todoListAPI.getTodoLists))

        const response: TodoListType[] = [{id: '1', title: 'Test', order: 1, addedDate: ''}]

        expect(gen.next(response).value).toEqual(put(setTodoLists(response)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
    test('fetch todoList: network error', () => {
        const gen = fetchTodoListsWS()
        gen.next()
        gen.next()
        expect(gen.throw({message: 'error'}).value).toEqual(put(handleServerNetworkError(error as ServerNetworkError)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
})

describe('create todoList', () => {
    test('create todoList: successful', () => {
        const gen = createTodoListWS({type: 'TODOLIST/CREATE-TODO-LIST', title})

        expect(gen.next().value).toEqual(put(setRequestStatus('loading')))
        expect(gen.next().value).toEqual(call(todoListAPI.createTodoList, title))

        const response: ResponseType<{ item: TodoListType }> = {
            resultCode: 0,
            data: {item: todoList},
            messages: []
        }

        expect(gen.next(response).value).toEqual(put(addTodoList(response.data.item)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
    test('create todoList: app error', () => {
        const gen = createTodoListWS({type: 'TODOLIST/CREATE-TODO-LIST', title})
        gen.next()
        gen.next()
        const response: ResponseType<{ item: TodoListType }> = {
            resultCode: 1,
            data: {item: todoList},
            messages: ['error']
        }
        expect(gen.next(response).value).toEqual(put(handleServerAppError(response)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
    test('create todoList: network error', () => {
        const gen = createTodoListWS({type: 'TODOLIST/CREATE-TODO-LIST', title})
        gen.next()
        gen.next()
        expect(gen.throw({message: 'error'}).value).toEqual(put(handleServerNetworkError(error as ServerNetworkError)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
})

describe('delete todoList', () => {
    test('delete todoList: successful', () => {
        const gen = deleteTodoListWS({type: 'TODOLIST/DELETE-TODO-LIST', id})

        expect(gen.next().value).toEqual(put(setRequestStatus('loading')))
        expect(gen.next().value).toEqual(call(todoListAPI.deleteTodoList, id))
        expect(gen.next(successResponse).value).toEqual(put(removeTodoList(id)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
    test('delete todoList: app error', () => {
        const gen = deleteTodoListWS({type: 'TODOLIST/DELETE-TODO-LIST', id})
        gen.next()
        gen.next()
        expect(gen.next(errorResponse).value).toEqual(put(handleServerAppError(errorResponse)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
    test('delete todoList: network error', () => {
        const gen = deleteTodoListWS({type: 'TODOLIST/DELETE-TODO-LIST', id})
        gen.next()
        gen.next()
        expect(gen.throw({message: 'error'}).value).toEqual(put(handleServerNetworkError(error as ServerNetworkError)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
})

describe('update todoList', () => {
    test('update todoList: successful', () => {
        const gen = updateTodoListWS({type: 'TODOLIST/UPDATE-TODO-LIST', id, title})

        expect(gen.next().value).toEqual(put(setRequestStatus('loading')))
        expect(gen.next().value).toEqual(call(todoListAPI.updateTodoList, id, title))
        expect(gen.next(successResponse).value).toEqual(put(changeTodoListTitle(id, title)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
    test('update todoList: app error', () => {
        const gen = updateTodoListWS({type: 'TODOLIST/UPDATE-TODO-LIST', id, title})
        gen.next()
        gen.next()
        expect(gen.next(errorResponse).value).toEqual(put(handleServerAppError(errorResponse)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
    test('update todoList: network error', () => {
        const gen = updateTodoListWS({type: 'TODOLIST/UPDATE-TODO-LIST', id, title})
        gen.next()
        gen.next()
        expect(gen.throw({message: 'error'}).value).toEqual(put(handleServerNetworkError(error as ServerNetworkError)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
})
import {createTaskWS, deleteTaskWS, fetchTasksWS} from "../task-sagas";
import {call, put} from "redux-saga/effects";
import {setRequestStatus} from "../../reducers/app-reducer";
import {ResponseTasksType, ResponseType, taskAPI, TaskPriorities, TaskStatuses, TaskType} from "../../../api/api";
import {addTask, ModelType, removeTask, setTasks} from "../../reducers/task-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../common/utils/error-utils";
import {ServerNetworkError} from "../../../common/types/ServerNetworkError";

let todoListId: string
let title: string
let taskId: string
let changes: ModelType
let createUpdateResponse: ResponseType<{ item: TaskType }>
let error: Error

beforeEach
(() => {
    todoListId = '1'
    title = 'Test'
    taskId = 'test1'
    changes = {
        title,
        deadline: '',
        priority: TaskPriorities.Low,
        startDate: '',
        status: TaskStatuses.New,
        description: ''
    }
    createUpdateResponse = {
        data: {
            item: {
                id: 'test1',
                todoListId: '1',
                title: 'Test',
                status: TaskStatuses.New,
                addedDate: '',
                order: -1,
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low
            }
        },
        messages: [],
        resultCode: 0
    }
    error = new Error('error')
})

describe('fetch tasks', () => {
    test('fetch tasks: successful', () => {
        const gen = fetchTasksWS({type: 'TASK/FETCH-TASKS', todoListId})

        expect(gen.next().value).toEqual(put(setRequestStatus('loading')))
        expect(gen.next().value).toEqual(call(taskAPI.getTasks, todoListId))

        const response: ResponseTasksType = {
            items: [{
                id: 'one',
                title: 'test',
                todoListId: '1',
                addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                status: TaskStatuses.New
            }],
            error: null,
            totalCount: 1
        }

        expect(gen.next(response).value).toEqual(put(setTasks(todoListId, response.items)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
    test('fetch tasks: network error', () => {
        const gen = fetchTasksWS({type: 'TASK/FETCH-TASKS', todoListId})
        gen.next()
        gen.next()
        expect(gen.throw({message: 'error'}).value).toEqual(put(handleServerNetworkError(error as ServerNetworkError)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
})

describe('create task', () => {
    test('create task: successful', () => {
        const gen = createTaskWS({type: 'TASK/CREATE-TASK', todoListId, title})

        expect(gen.next().value).toEqual(put(setRequestStatus('loading')))
        expect(gen.next().value).toEqual(call(taskAPI.createTask, todoListId, title))
        expect(gen.next(createUpdateResponse).value).toEqual(put(addTask(createUpdateResponse.data.item)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
    test('create task: app error', () => {
        const gen = createTaskWS({type: 'TASK/CREATE-TASK', todoListId, title})
        gen.next()
        gen.next()
        createUpdateResponse.resultCode = 1
        createUpdateResponse.messages.push('error')
        expect(gen.next(createUpdateResponse).value).toEqual(put(handleServerAppError(createUpdateResponse)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
    test('create task: network error', () => {
        const gen = createTaskWS({type: 'TASK/CREATE-TASK', todoListId, title})
        gen.next()
        gen.next()
        expect(gen.throw({message: 'error'}).value).toEqual(put(handleServerNetworkError(error as ServerNetworkError)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
})

describe('delete task', () => {
    test('delete task: successful', () => {
        const gen = deleteTaskWS({type: 'TASK/DELETE-TASK', todoListId, taskId})

        expect(gen.next().value).toEqual(put(setRequestStatus('loading')))
        expect(gen.next().value).toEqual(call(taskAPI.deleteTask, todoListId, taskId))

        const response: ResponseType = {
            data: {},
            messages: [],
            resultCode: 0
        }

        expect(gen.next(response).value).toEqual(put(removeTask(todoListId, taskId)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
    test('delete task: app error', () => {
        const gen = deleteTaskWS({type: 'TASK/DELETE-TASK', todoListId, taskId})
        gen.next()
        gen.next()

        const response: ResponseType = {
            data: {},
            messages: ['error'],
            resultCode: 1
        }

        expect(gen.next(response).value).toEqual(put(handleServerAppError(response)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
    test('delete task: network error', () => {
        const gen = deleteTaskWS({type: 'TASK/DELETE-TASK', todoListId, taskId})
        gen.next()
        gen.next()
        expect(gen.throw({message: 'error'}).value).toEqual(put(handleServerNetworkError(error as ServerNetworkError)))
        expect(gen.next().value).toEqual(put(setRequestStatus('succeeded')))
    })
})

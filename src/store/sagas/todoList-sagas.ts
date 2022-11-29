//actions
import {setRequestStatus} from "../reducers/app-reducer";
import {ResponseType, todoListAPI, TodoListType} from "../../api/api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {addTodoList, changeTodoListTitle, removeTodoList, setTodoLists} from "../reducers/todoList-reducer";
import {call, put, takeEvery} from "redux-saga/effects";
import {ServerNetworkError} from "../../common/types/ServerNetworkError";

export const fetchTodoLists = () => ({type: 'TODOLIST/FETCH-TODO-LIST'})
export const createTodoList = (title: string) => ({type: 'TODOLIST/CREATE-TODO-LIST', title})
export const deleteTodoList = (id: string) => ({type: 'TODOLIST/DELETE-TODO-LIST', id})
export const updateTodoList = (id: string, title: string) => ({type: 'TODOLIST/UPDATE-TODO-LIST', id, title})

//Worker saga
export function* fetchTodoListsWS() {
    yield put(setRequestStatus('loading'))
    try {
        const data: TodoListType[] = yield call(todoListAPI.getTodoLists)
        yield put(setTodoLists(data))
    } catch (e) {
        yield put(handleServerNetworkError(e as ServerNetworkError))
    } finally {
        yield put(setRequestStatus('succeeded'))
    }
}

export function* createTodoListWS({title}: ReturnType<typeof createTodoList>) {
    yield put(setRequestStatus('loading'))
    try {
        const data: ResponseType<{ item: TodoListType }> = yield call(todoListAPI.createTodoList, title)

        if (data.resultCode === 0) {
            yield put(addTodoList(data.data.item))
        } else {
            yield put(handleServerAppError(data))
        }
    } catch (e) {
        yield put(handleServerNetworkError(e as ServerNetworkError))
    } finally {
        yield put(setRequestStatus('succeeded'))
    }
}

export function* deleteTodoListWS({id}: ReturnType<typeof deleteTodoList>) {
    yield put(setRequestStatus('loading'))
    try {
        const data: ResponseType = yield call(todoListAPI.deleteTodoList, id)
        if (data.resultCode === 0) {
            yield put(removeTodoList(id))
        } else {
            yield put(handleServerAppError(data))
        }
    } catch (e) {
        yield put(handleServerNetworkError(e as ServerNetworkError))
    } finally {
        yield put(setRequestStatus('succeeded'))
    }
}

export function* updateTodoListWS({id, title}: ReturnType<typeof updateTodoList>) {
    yield put(setRequestStatus('loading'))
    try {
        const data: ResponseType = yield call(todoListAPI.updateTodoList, id, title)
        if (data.resultCode === 0) {
            yield put(changeTodoListTitle(id, title))
        } else {
            yield put(handleServerAppError(data))
        }
    } catch (e) {
        yield put(handleServerNetworkError(e as ServerNetworkError))
    } finally {
        yield put(setRequestStatus('succeeded'))
    }
}

export function* todoListWatcher() {
    yield takeEvery('TODOLIST/FETCH-TODO-LIST', fetchTodoListsWS)
    yield takeEvery('TODOLIST/CREATE-TODO-LIST', createTodoListWS)
    yield takeEvery('TODOLIST/DELETE-TODO-LIST', deleteTodoListWS)
    yield takeEvery('TODOLIST/UPDATE-TODO-LIST', updateTodoListWS)
}
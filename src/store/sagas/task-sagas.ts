import {call, put, select, takeEvery} from "redux-saga/effects";
import {setRequestStatus} from "../reducers/app-reducer";
import {ResponseTasksType, ResponseType, taskAPI, TaskType, UpdateTaskModelType} from "../../api/api";
import {handleServerAppError, handleServerNetworkError} from "../../common/utils/error-utils";
import {ServerNetworkError} from "../../common/types/ServerNetworkError";
import {addTask, changeTask, ModelType, removeTask, setTasks} from "../reducers/task-reducer";
import {getTasks} from "../selectors/task-selectors";

//actions
export const fetchTasks = (todoListId: string) => ({type: 'TASK/FETCH-TASKS', todoListId})
export const createTask = (todoListId: string, title: string) => ({type: 'TASK/CREATE-TASK', todoListId, title})
export const deleteTask = (todoListId: string, taskId: string) => ({type: 'TASK/DELETE-TASK', todoListId, taskId})
export const updateTask = (todoListId: string, taskId: string, changes: ModelType) => ({
    type: 'TASK/UPDATE-TASK',
    todoListId,
    taskId,
    changes
})

//Worker Saga
export function* fetchTasksWS({todoListId}: ReturnType<typeof fetchTasks>) {
    yield put(setRequestStatus('loading'))
    try {
        const data: ResponseTasksType = yield call(taskAPI.getTasks, todoListId)

        if (data.error === null) {
            yield put(setTasks(todoListId, data.items))
        }
    } catch (e) {
        yield put(handleServerNetworkError(e as ServerNetworkError))
    } finally {
        yield put(setRequestStatus('succeeded'))
    }
}

export function* createTaskWS({todoListId, title}: ReturnType<typeof createTask>) {
    yield put(setRequestStatus('loading'))
    try {
        const data: ResponseType<{ item: TaskType }> = yield call(taskAPI.createTask, todoListId, title)

        if (data.resultCode === 0) {
            yield put(addTask(data.data.item))
        } else {
            yield put(handleServerAppError(data))
        }
    } catch (e) {
        yield put(handleServerNetworkError(e as ServerNetworkError))
    } finally {
        yield put(setRequestStatus('succeeded'))
    }
}

export function* deleteTaskWS({todoListId, taskId}: ReturnType<typeof deleteTask>) {
    yield put(setRequestStatus('loading'))
    try {
        const data: ResponseType = yield call(taskAPI.deleteTask, todoListId, taskId)

        if (data.resultCode === 0) {
            yield put(removeTask(todoListId, taskId))
        } else {
            yield put(handleServerAppError(data))
        }
    } catch (e) {
        yield put(handleServerNetworkError(e as ServerNetworkError))
    } finally {
        yield put(setRequestStatus('succeeded'))
    }
}

export function* updateTaskWS({todoListId, taskId, changes}: ReturnType<typeof updateTask>) {
    const tasks: ReturnType<typeof getTasks> = yield select(getTasks)
    const task = tasks[todoListId].find(t => t.id === taskId)

    if (!task) {
        console.log('task not found in the state')
        return
    }

    const model: UpdateTaskModelType = {
        ...task,
        ...changes
    }

    yield put(setRequestStatus('loading'))

    try {
        const data: ResponseType<{ item: TaskType }> = yield call(taskAPI.updateTask, todoListId, taskId, model)
        if (data.resultCode === 0) {
            yield put(changeTask(todoListId, taskId, model))
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
export function* taskWatcher() {
    yield takeEvery('TASK/FETCH-TASKS', fetchTasksWS)
    yield takeEvery('TASK/CREATE-TASK', createTaskWS)
    yield takeEvery('TASK/DELETE-TASK', deleteTaskWS)
    yield takeEvery('TASK/UPDATE-TASK', updateTaskWS)
}
import * as taskSelectors from './selectors'
import {asyncActions, slice} from './task-reducer';

const taskReducer = slice.reducer

const taskActions = {
    ...asyncActions,
    ...slice.actions
}

export {
    taskReducer,
    taskActions,
    taskSelectors,
}
import * as todolistSelectors from './selectors'
import {asyncActions, slice} from './todoList-reducer';

const todoListReducer = slice.reducer

const todoListsActions = {
    ...asyncActions,
    ...slice.actions
}

export {
    todoListReducer,
    todoListsActions,
    todolistSelectors,
}
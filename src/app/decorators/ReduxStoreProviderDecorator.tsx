import {combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {TaskPriorities, TaskStatuses} from '../../api/types';
import {AppRootStateType} from '../store';
import {appReducer} from '../../features/Application';
import {authReducer} from '../../features/Auth';
import {todoListReducer} from '../../features/ToDoList';
import {taskReducer} from '../../features/Task/task-reducer';
import {configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    app:appReducer,
    auth: authReducer,
    todoList: todoListReducer,
    task: taskReducer
})

export const initialGlobalState: AppRootStateType = {
    todoList: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: -1},
        {id: "todolistId3", title: "Some text", filter: "all", addedDate: '', order: -2}
    ] ,
    task: {
        "todolistId1": [
            {id: '1', title: "HTML&CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '2', title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        "todolistId2": [
            {id: '3', title: "Milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '4', title: "React Book", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        "todolistId3":[]
    },
    app: {
        error: null,
        status: 'loading',
        isInitialized: true
    },
    auth: {
        isLoggedIn: true
    }
};

export const storyBookStore = configureStore({
    reducer: rootReducer,
});

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>)


import {TaskPriorities, TaskStatuses, TaskType} from '../../api/types';
import {taskReducer, TasksStateType,} from './task-reducer';
import {taskActions} from './index';

const {createTask, deleteTask, fetchTasks, updateTask} = taskActions

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        '1': [
            {
                id: 'one',
                todoListId: '1',
                title: 'Bread',
                status: TaskStatuses.InProgress,
                addedDate: '16.08.2022',
                order: -1,
                startDate: '16.08.2022',
                deadline: '16.08.2025',
                description: '',
                priority: TaskPriorities.Low
            }
        ],
        '2': [
            {
                id: '01',
                todoListId: '2',
                title: 'React',
                status: TaskStatuses.InProgress,
                addedDate: '16.08.2022',
                order: -1,
                startDate: '16.08.2022',
                deadline: '16.08.2025',
                description: '',
                priority: TaskPriorities.Low
            }
        ]
    }
})

test('Todo task should be displayed', () => {
    const tasks = [{
        id: 'one',
        todoListId: '1',
        title: 'Bread',
        status: TaskStatuses.InProgress,
        addedDate: '16.08.2022',
        order: -1,
        startDate: '16.08.2022',
        deadline: '16.08.2025',
        description: '',
        priority: TaskPriorities.Low
    }]

    const endState = taskReducer({'1': []}, fetchTasks.fulfilled({todoListId: '1', tasks}, 'requestID', '1'))

    expect(endState['1'].length).toBe(1)
    expect(endState['1'][0].id).toBe('one')
})

test('A new task should be added', () => {
    const newTask: TaskType = {
        id: 'two',
        todoListId: '2',
        title: 'Test Task',
        status: TaskStatuses.InProgress,
        addedDate: '16.08.2022',
        order: 0,
        startDate: '16.08.2022',
        deadline: '16.08.2025',
        description: '',
        priority: TaskPriorities.Low
    }

    const endState = taskReducer(startState, createTask.fulfilled(newTask, 'requestID', {
        title: newTask.title,
        todoListId: newTask.todoListId
    }))

    expect(endState['2'].length).toBe(2)
    expect(endState['2'][0].title).toBe('Test Task')
})

test('The task should be deleted', () => {
    let param = {todoListId: '1', taskId: 'one'};
    const endState = taskReducer(startState, deleteTask.fulfilled(param, 'requestID', param))

    expect(endState['1'].length).toBe(0)
})

test('The todo list should to be changed', () => {
    const newTitle = {
        id: 'one',
        todoListId: '1',
        title: 'Test changes',
        status: TaskStatuses.InProgress,
        addedDate: '16.08.2022',
        order: -1,
        startDate: '16.08.2022',
        deadline: '16.08.2025',
        description: '',
        priority: TaskPriorities.Low
    }

    const endState = taskReducer(startState,
        updateTask.fulfilled(
            {todoListId: '1', taskId: 'one', model: newTitle},
            'requestID',
            {todoListId: '1', taskId: 'one', model: newTitle}
        )
    )

    expect(endState['1'][0].title).toBe('Test changes')
})

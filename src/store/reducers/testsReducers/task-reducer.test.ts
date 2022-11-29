import {TaskPriorities, TaskStatuses, TaskType} from '../../../api/api';
import {addTask, changeTask, removeTask, setTasks, taskReducer, TasksStateType} from '../task-reducer';

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

    const endState = taskReducer({'1': []}, setTasks('1', tasks))

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

    const endState = taskReducer(startState, addTask(newTask))

    expect(endState['2'].length).toBe(2)
    expect(endState['2'][0].title).toBe('Test Task')
})

test('The task should be deleted', () => {
    const endState = taskReducer(startState, removeTask('1','one'))

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

    const endState = taskReducer(startState, changeTask('1','one', newTitle))

    expect(endState['1'][0].title).toBe('Test changes')
})

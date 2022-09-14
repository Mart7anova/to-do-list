import {taskReducer, TasksStateType} from '../../store/reducers/task-reducer';
import {addTodoList, setTodoLists, todoListReducer, TodoListStateType} from '../../store/reducers/todoList-reducer';

let startTodoListState: TodoListStateType[] = []
let startTaskState: TasksStateType = {}


test('When adding todolist, tasks should be empty arrays', () => {
    const newTodoList = {id: '1', title: 'Test todo list', addedDate: '16.08.2022', order: -2}
    const action = addTodoList(newTodoList)
    const endTodoListState = todoListReducer(startTodoListState, action)
    const endTaskState = taskReducer(startTaskState, action)

    expect(endTodoListState[0].id).toBe('1')
    expect(endTaskState['1']).toStrictEqual([])
})

test('when loading the todoList, the task array should be empty', () => {
    const newTodoListState = [
        {id: '1', title: 'Test todo list', addedDate: '16.08.2022', order: -2, filter: 'all'}
    ]
    const action = setTodoLists(newTodoListState)
    const endTodoListState = todoListReducer(startTodoListState, action)
    const endTaskState = taskReducer(startTaskState, action)

    expect(endTodoListState[0].id).toBe('1')
    expect(endTaskState['1']).toStrictEqual([])
})
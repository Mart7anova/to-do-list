import {
    changeTodoListFilter,
    createTodoList,
    deleteTodoList,
    fetchTodoLists,
    FilterValuesType,
    todoListReducer,
    TodoListStateType,
    updateTodoListTitle
} from '../../store/reducers/todoList-reducer';

let startState: TodoListStateType[] = []

beforeEach(() => {
    startState = [
        {id: '1', title: 'What to learn', addedDate: '16.08.2022', order: -1, filter: 'all'},
        {id: '2', title: 'What to buy', addedDate: '16.08.2022', order: 0, filter: 'all'}
    ]
})

test('Todo lists should be displayed', () => {
    const endState = todoListReducer([], fetchTodoLists.fulfilled(startState, 'requestID'))

    expect(endState.length).toBe(2)
})

test('A new todo list should be added', () => {
    const newTodoList = {id: '3', title: 'Test todo list', addedDate: '16.08.2022', order: -2}

    const endState = todoListReducer(startState, createTodoList.fulfilled(newTodoList, 'requestID', newTodoList.title))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('Test todo list')
})

test('The todo list should be deleted', () => {
    const endState = todoListReducer(startState, deleteTodoList.fulfilled('1', 'requestID', '1'))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe('2')
})

test('The todo list should to be changed', () => {
    const data = {id:'1', title: 'Test title'}

    const endState = todoListReducer(startState, updateTodoListTitle.fulfilled(data, 'requestID', data))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('Test title')
})
test('The filter should to be changed', () => {
    const newFilter:FilterValuesType = 'completed'

    const endState = todoListReducer(startState, changeTodoListFilter({id:'1', filter:newFilter}))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('completed')
})
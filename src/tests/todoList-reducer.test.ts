import {
    addTodoList, changeTodoListFilter,
    changeTodoListTitle, FilterValuesType,
    removeTodoList,
    setTodoLists,
    todoListReducer,
    TodoListStateType
} from '../reducers/todoList-reducer';

let startState: TodoListStateType[] = []

beforeEach(() => {
    startState = [
        {id: '1', title: 'What to learn', addedDate: '16.08.2022', order: -1, filter: 'all'},
        {id: '2', title: 'What to buy', addedDate: '16.08.2022', order: 0, filter: 'all'}
    ]
})

test('Todo lists should be displayed', () => {
    const endState = todoListReducer([], setTodoLists(startState))

    expect(endState.length).toBe(2)
})

test('A new todo list should be added', () => {
    const newTodoList = {id: '3', title: 'Test todo list', addedDate: '16.08.2022', order: -2}

    const endState = todoListReducer(startState, addTodoList(newTodoList))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('Test todo list')
})

test('The todo list should be deleted', () => {
    const endState = todoListReducer(startState, removeTodoList('1'))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe('2')
})

test('The todo list should to be changed', () => {
    const newTitle = 'Test title'

    const endState = todoListReducer(startState, changeTodoListTitle('1', newTitle))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('Test title')
})
test('The filter should to be changed', () => {
    const newFilter:FilterValuesType = 'completed'

    const endState = todoListReducer(startState, changeTodoListFilter('1', newFilter))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('completed')
})
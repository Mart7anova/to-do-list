import {TodoListType} from '../../api/api';

const initialState: TodoListStateType[] = []

export const todoListReducer = (state: TodoListStateType[] = initialState, action: todoListActionType): TodoListStateType[] => {
    switch (action.type) {
        case 'TODOLIST/SET-TODO-LISTS':
            return action.todoLists.map(t => ({...t, filter: 'all'}))
        case 'TODOLIST/ADD-TODO-LIST':
            return [{...action.todoList, filter: 'all'}, ...state,]
        case 'TODOLIST/REMOVE-TODO-LIST':
            return state.filter(t => t.id !== action.id)
        case 'TODOLIST/CHANGE-TODO-LIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case 'TODOLIST/CHANGE-TODO-LIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        default:
            return state
    }
}
//actions
export const setTodoLists = (todoLists: TodoListType[]) => ({type: 'TODOLIST/SET-TODO-LISTS', todoLists} as const)
export const addTodoList = (todoList: TodoListType) => ({type: 'TODOLIST/ADD-TODO-LIST', todoList} as const)
export const removeTodoList = (id: string) => ({type: 'TODOLIST/REMOVE-TODO-LIST', id} as const)
export const changeTodoListTitle = (id: string, title: string) => ({
    type: 'TODOLIST/CHANGE-TODO-LIST-TITLE',
    id,
    title
} as const)
export const changeTodoListFilter = (id: string, filter: FilterValuesType) => (
    {type: 'TODOLIST/CHANGE-TODO-LIST-FILTER', id, filter} as const
)

//types
export type todoListActionType = ReturnType<typeof setTodoLists>
    | ReturnType<typeof addTodoList>
    | ReturnType<typeof removeTodoList>
    | ReturnType<typeof changeTodoListTitle>
    | ReturnType<typeof changeTodoListFilter>

export type TodoListStateType = TodoListType & {
    filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'active' | 'completed'
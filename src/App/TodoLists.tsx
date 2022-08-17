import React, {useEffect} from 'react';
import {fetchTodoLists} from '../reducers/todoList-reducer';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {TodoList} from './TodoList';


export const TodoLists = () => {
    const todoLists = useAppSelector(state => state.todoList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodoLists())
    }, [dispatch])

    return (
        <div>
            {todoLists.map(t => <TodoList key={t.id} todoList={t}/>)}
        </div>
    );
};

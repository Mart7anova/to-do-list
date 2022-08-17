import React, {useEffect} from 'react';
import {fetchTodoLists} from '../reducers/todoList-reducer';
import {useAppDispatch, useAppSelector} from '../App/hooks';
import {Task} from './Task/Task';

export const TodoList = () => {
    const todoLists = useAppSelector(state => state.todoList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodoLists())
    }, [])

    return (
        <div>
            {todoLists.map(t => <div key={t.id}>
                <h1>{t.title}</h1>
                <Task key={t.id} todoListId={t.id}/>
            </div>)}
        </div>
    );
};

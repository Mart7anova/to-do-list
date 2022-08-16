import React, {useEffect} from 'react';
import {fetchTodoLists} from './todoList-reducer';
import {useAppDispatch, useAppSelector} from '../App/hooks';

export const TodoList = () => {
    const todoList = useAppSelector(state => state.todoList)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchTodoLists())
    },[])

    return (
        <div>
            {todoList.map(t=><div key={t.id}>
                {t.title}
            </div>)}
        </div>
    );
};

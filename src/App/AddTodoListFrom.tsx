import React, {useCallback} from 'react';
import style from './styles/NavigationBar.module.scss'
import {AddItemForm} from '../components/AddItemForm';
import {useAppDispatch} from '../hooks/hooks';
import {createTodoList} from '../reducers/todoList-reducer';

export const AddTodoListFrom = () => {
    const dispatch = useAppDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodoList(title))
    }, [dispatch])

    return (
        <div className={style.addItemFromContainer}>
            <AddItemForm addItem={addTodoList} itemTitle={'to-do list'}/>
        </div>
    );
};

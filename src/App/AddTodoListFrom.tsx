import React, {useCallback} from 'react';
import {Grid} from '@material-ui/core';
import style from './NavigationBar.module.scss'
import {AddItemForm} from '../components/AddItemForm';
import {useAppDispatch} from '../hooks/hooks';
import {createTodoList} from '../reducers/todoList-reducer';

export const AddTodoListFrom = () => {
    const dispatch = useAppDispatch()

    const addTodoList = useCallback((title: string) => {
      dispatch(createTodoList(title))
    },[dispatch])

    return (
        <Grid className={style.addItemFromContainer}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
    );
};

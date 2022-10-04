import React, {useEffect} from 'react';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {TodoListItem} from './ToDoListItem/TodoListItem';
import {Grid, Paper} from '@material-ui/core';
import {Navigate} from 'react-router-dom';
import style from './TodoList.module.scss'
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {selectIsLoggedIn} from '../Auth/selectors';
import {selectTodoLists} from './selectors';
import {todoListsActions} from './index';

const {fetchTodoLists} = todoListsActions

export const TodoList = () => {
    const todoLists = useAppSelector(selectTodoLists)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodoLists())
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'login'}/>
    }

    return (
        <Grid container spacing={3} className={style.todoListsContainer}>
            {
                todoLists.map(t =>
                    <Grid item key={t.id}>
                        <Paper className={style.todoListItem}>
                            <TodoListItem todoList={t}/>
                        </Paper>
                    </Grid>)
            }
        </Grid>
    );
};

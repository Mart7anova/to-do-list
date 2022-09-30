import React, {useEffect} from 'react';
import {fetchTodoLists} from '../store/reducers/todoList-reducer';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {TodoList} from './TodoList';
import {Grid, Paper} from '@material-ui/core';
import {Navigate} from 'react-router-dom';
import style from './styles/TodoLists.module.scss'
import {useAppSelector} from '../hooks/useAppSelector';

export const TodoLists = () => {
    const todoLists = useAppSelector(state => state.todoList)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
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
                            <TodoList todoList={t}/>
                        </Paper>
                    </Grid>)
            }
        </Grid>
    );
};

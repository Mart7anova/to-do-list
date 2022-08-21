import React, {useEffect} from 'react';
import {fetchTodoLists} from '../reducers/todoList-reducer';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {TodoList} from './TodoList';
import {Grid, Paper} from '@material-ui/core';
import {Navigate} from 'react-router-dom';


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
        <Grid container spacing={3}>
            {
                todoLists.map(t =>
                    <Grid item key={t.id}>
                        <Paper style={{padding: '20px'}}>
                            <TodoList todoList={t}/>
                        </Paper>
                    </Grid>)
            }
        </Grid>
    );
};

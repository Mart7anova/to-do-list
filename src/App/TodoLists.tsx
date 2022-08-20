import React, {useEffect} from 'react';
import {fetchTodoLists} from '../reducers/todoList-reducer';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {TodoList} from './TodoList';
import {Grid, Paper} from '@material-ui/core';
import {Navigate} from 'react-router-dom';


export const TodoLists = () => {
    const todoLists = useAppSelector(state => state.todoList)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodoLists())
    }, [dispatch])

    if(!isInitialized){
        return <Navigate to={'login'}/>
    }

    return (
        <Grid container spacing={3}>
            {
                todoLists.map(t =>
                <Grid item key={t.id}>
                    <Paper style={{padding: '10px'}}>
                        <TodoList todoList={t} />
                    </Paper>
                </Grid>)
            }
        </Grid>
    );
};

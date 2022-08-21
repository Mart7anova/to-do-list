import React, {FC, memo, useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {TodoListType} from '../api/api';
import {createTask, deleteTask, fetchTasks, ModelType, updateTask} from '../reducers/task-reducer';
import {Task} from './Task';
import {AddItemForm} from '../components/AddItemForm';
import {EditableSpan} from '../components/EditableSpan';
import {deleteTodoList, updateTodoList} from '../reducers/todoList-reducer';
import style from './styles/TodoList.module.scss';
import {Button, Grid} from '@material-ui/core';

type PropsType = {
    todoList: TodoListType
}

export const TodoList: FC<PropsType> = memo( (props) => {
    const {
        todoList,
    } = props

    const tasks = useAppSelector(state => state.task)
    const dispatch = useAppDispatch()

    //todoList
    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(updateTodoList(todoList.id, title))
    }, [dispatch, todoList.id])

    const removeTodoList = useCallback(() => {
        dispatch(deleteTodoList(todoList.id))
    }, [dispatch, todoList.id])

    //task
    const changeTask = useCallback((taskId: string, changes: ModelType) => {
        dispatch(updateTask(todoList.id, taskId, changes))
    }, [dispatch, todoList.id])

    const removeTask = useCallback((taskId: string) => {
        dispatch(deleteTask(todoList.id, taskId))
    }, [dispatch, todoList.id])

    const addTask = useCallback((title: string) => {
        dispatch(createTask(todoList.id, title))
    }, [dispatch, todoList.id])

    useEffect(() => {
        dispatch(fetchTasks(todoList.id))
    }, [dispatch, todoList.id])

    return (
        <div key={todoList.id}>
            <Grid container justifyContent={'space-between'}>
                <h2 className={style.heading}>
                    {<EditableSpan value={todoList.title} onChange={changeTodoListTitle}/>}
                </h2>
                <Button className={style.addButton}
                        variant={'text'}
                        color={'default'}
                        disableElevation
                        size={'small'}
                        onClick={removeTodoList}
                >
                    <p>x</p>
                </Button>
            </Grid>
            <AddItemForm addItem={addTask} itemTitle={'task'}/>
            {
                tasks[todoList.id].map(t => <Task key={t.id}
                                                  task={t}
                                                  changeTask={changeTask}
                                                  removeTask={removeTask}
                />)
            }
        </div>
    );
});

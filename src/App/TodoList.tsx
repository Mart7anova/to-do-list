import React, {FC, useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {TodoListType} from '../api/api';
import {deleteTask, fetchTasks, ModelType, updateTask} from '../reducers/task-reducer';
import {Task} from './Task';

type PropsType = {
    todoList: TodoListType
}

export const TodoList: FC<PropsType> = (props) => {
    const {
        todoList
    } = props

    const tasks = useAppSelector(state => state.task)
    const dispatch = useAppDispatch()

    const changeTask = useCallback((taskId: string, changes: ModelType) => {
        dispatch(updateTask(todoList.id, taskId, changes))
    }, [dispatch, todoList.id])

    const removeTask = useCallback((taskId: string) => {
        dispatch(deleteTask(todoList.id, taskId))
    }, [dispatch, todoList.id])

    useEffect(() => {
        dispatch(fetchTasks(todoList.id))
    }, [dispatch, todoList.id])

    return (
        <div key={todoList.id}>
            <h1>{todoList.title}</h1>
            {
                tasks[todoList.id].map(t => <Task key={t.id}
                                                  task={t}
                                                  changeTask={changeTask}
                                                  removeTask={removeTask}
                />)
            }
        </div>
    );
};

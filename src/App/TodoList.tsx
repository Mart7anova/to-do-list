import React, {FC, useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {TodoListType} from '../api/api';
import {createTask, deleteTask, fetchTasks, ModelType, updateTask} from '../reducers/task-reducer';
import {Task} from './Task';
import {AddItemForm} from '../components/AddItemForm';

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

    const addTask = useCallback((title: string) => {
        dispatch(createTask(todoList.id, title))
    }, [dispatch, todoList.id])

    useEffect(() => {
        dispatch(fetchTasks(todoList.id))
    }, [dispatch, todoList.id])

    return (
        <div key={todoList.id}>
            <h2>{todoList.title}</h2>
            <AddItemForm addItem={addTask}/>
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

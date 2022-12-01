import React, {FC, memo, useCallback, useEffect} from 'react';
import {useAppSelector} from '../hooks/hooks';
import {ModelType} from '../store/reducers/task-reducer';
import {Task} from './Task';
import {AddItemForm} from '../common/components/AddItemForm';
import {EditableSpan} from '../common/components/EditableSpan';
import CloseIcon from '@material-ui/icons/Close';
import {changeTodoListFilter, FilterValuesType, TodoListStateType,} from '../store/reducers/todoList-reducer';
import style from './styles/TodoList.module.scss';
import {Button, ButtonGroup, Grid} from '@material-ui/core';
import {TaskStatuses} from '../api/api';
import {useDispatch} from "react-redux";
import {createTask, deleteTask, fetchTasks, updateTask} from "../store/sagas/task-sagas";
import {getTasks} from "../store/selectors/task-selectors";
import {deleteTodoList, updateTodoList} from "../store/sagas/todoList-sagas";

type PropsType = {
    todoList: TodoListStateType
}

export const TodoList: FC<PropsType> = memo( (props) => {
    const {
        todoList,
    } = props

    const tasks = useAppSelector(getTasks)
    const dispatch = useDispatch()

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

    //filter
    const onChangeFilter = useCallback((filter: FilterValuesType) => {
        dispatch(changeTodoListFilter(todoList.id, filter))
    },[dispatch, todoList.id])

    let tasksForTodolist = tasks[todoList.id]

    if(todoList.filter === 'active'){
        tasksForTodolist = tasks[todoList.id].filter(t => {
            return t.status === TaskStatuses.New
        })
    }
    if(todoList.filter === 'completed'){
        tasksForTodolist = tasks[todoList.id].filter(t => t.status === TaskStatuses.Completed)
    }

    //useEffect
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
                    <CloseIcon color={'action'}/>
                </Button>
            </Grid>
            <AddItemForm addItem={addTask} itemTitle={'task'}/>
            {
                tasksForTodolist.map(t => <Task key={t.id}
                                                  task={t}
                                                  changeTask={changeTask}
                                                  removeTask={removeTask}
                />)
            }
            <ButtonGroup className={style.ButtonGroup} color={'default'} aria-label={'outlined primary button group'}>
                <Button onClick={()=>onChangeFilter('all')}>
                    <p>All</p>
                </Button>
                <Button onClick={()=>onChangeFilter('active')}>
                    <p>Active</p>
                </Button>
                <Button onClick={()=>onChangeFilter('completed')}>
                    <p>Completed</p>
                </Button>
            </ButtonGroup>
        </div>

    );
});

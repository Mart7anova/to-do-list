import React, {FC, memo, useCallback, useEffect} from 'react';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {createTask, deleteTask, fetchTasks, ModelType, updateTask} from '../store/reducers/task-reducer';
import {Task} from './Task';
import {AddItemForm} from './common/AddItemForm';
import {EditableSpan} from './common/EditableSpan';
import CloseIcon from '@material-ui/icons/Close';
import {
    changeTodoListFilter,
    deleteTodoList,
    FilterValuesType,
    TodoListStateType,
    updateTodoListTitle
} from '../store/reducers/todoList-reducer';
import style from './styles/TodoList.module.scss';
import {Button, ButtonGroup, Grid} from '@material-ui/core';
import {TaskStatuses} from '../api/api';
import {useAppSelector} from '../hooks/useAppSelector';

type PropsType = {
    todoList: TodoListStateType
}

export const TodoList: FC<PropsType> = memo((props) => {
    const {
        todoList,
    } = props

    const tasks = useAppSelector(state => state.task)
    const dispatch = useAppDispatch()

    //todoList
    const changeTodoListTitle = (title: string) => {
        dispatch(updateTodoListTitle({id: todoList.id, title}))
    }

    const removeTodoList = () => {
        dispatch(deleteTodoList(todoList.id))
    }

    //task
    const changeTask = useCallback((taskId: string, changes: ModelType) => {
        dispatch(updateTask({todoListId: todoList.id, taskId, model: changes}))
    }, [dispatch, todoList.id])

    const removeTask = useCallback((taskId: string) => {
        dispatch(deleteTask({todoListId: todoList.id, taskId}))
    }, [dispatch, todoList.id])

    const addTask = (title: string) => {
        dispatch(createTask({todoListId: todoList.id, title}))
    }


    const onChangeFilter = (filter: FilterValuesType) => {
        dispatch(changeTodoListFilter({id: todoList.id, filter}))
    }

    let tasksForTodolist = tasks[todoList.id]

    if (todoList.filter === 'active') {
        tasksForTodolist = tasks[todoList.id].filter(t => {
            return t.status === TaskStatuses.New
        })
    }

    if (todoList.filter === 'completed') {
        tasksForTodolist = tasks[todoList.id].filter(t => t.status === TaskStatuses.Completed)
    }


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

            <ButtonGroup className={style.ButtonGroup} color={'default'}>
                <Button onClick={() => onChangeFilter('all')}>
                    <p style={{color: todoList.filter === 'all' ? 'black' : 'gray', fontWeight: 'bold'}}>All</p>
                </Button>

                <Button onClick={() => onChangeFilter('active')}>
                    <p style={{color: todoList.filter === 'active' ? 'black' : 'gray', fontWeight: 'bold'}}>Active</p>
                </Button>

                <Button onClick={() => onChangeFilter('completed')}>
                    <p style={{
                        color: todoList.filter === 'completed' ? 'black' : 'gray',
                        fontWeight: 'bold'
                    }}>Completed</p>
                </Button>
            </ButtonGroup>
        </div>

    );
});

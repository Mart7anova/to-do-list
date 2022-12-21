import React, {FC, memo, useCallback, useEffect} from 'react';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {ModelType} from '../../Task/task-reducer';
import {Task} from '../../Task/Task';
import {AddItemForm} from '../../../common/components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../common/components/EditableSpan/EditableSpan';
import CloseIcon from '@material-ui/icons/Close';
import {FilterValuesType, TodoListStateType,} from '../todoList-reducer';
import style from './TodoListItem.module.scss';
import {Button, ButtonGroup, Grid} from '@material-ui/core';
import {TaskStatuses} from '../../../api/types';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {todoListsActions} from '../index';
import {selectTask} from '../../Task/selectors';
import {taskActions} from '../../Task';

const {changeTodoListFilter, deleteTodoList, updateTodoListTitle} = todoListsActions
const {createTask, deleteTask, fetchTasks, updateTask} = taskActions

type PropsType = {
    todoList: TodoListStateType
}

export const TodoListItem: FC<PropsType> = memo((props) => {
    const {
        todoList,
    } = props

    const tasks = useAppSelector(selectTask)
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
    }, [todoList])


    return (
        <div>
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

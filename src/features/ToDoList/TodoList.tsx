import React, {useEffect, useRef} from 'react';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {TodoListItem} from './ToDoListItem/TodoListItem';
import {Grid, Paper} from '@material-ui/core';
import {Navigate} from 'react-router-dom';
import style from './TodoList.module.scss'
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {selectIsLoggedIn} from '../Auth/selectors';
import {selectTodoLists} from './selectors';
import {todoListsActions} from './index';

const {fetchTodoLists, reorderTodoList,} = todoListsActions

export const TodoList = () => {
    const dispatch = useAppDispatch()

    const todoLists = useAppSelector(selectTodoLists)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const dragItem: React.MutableRefObject<number | null> = useRef(null);
    const dragOverItem: React.MutableRefObject<number | null> = useRef(null);

    useEffect(() => {
        dispatch(fetchTodoLists())
    }, [dispatch])

    const dragStart = (position: number) => {
        console.log(position,'start')
        dragItem.current = position
    }
    const dragEnter = (position: number) => {
        console.log(position,'end')
        dragOverItem.current = position;
    };

    const drop = async (e:any) => {
        if ((dragItem.current && dragOverItem.current) !== null) {
            debugger
            const todoListStart = todoLists.find(t => t.order === dragItem.current)
            const todoListEnd = todoLists.find(t => t.order === dragOverItem.current)

            if (todoListStart && todoListEnd && todoListStart.id !== todoListEnd.id) {

                await dispatch(reorderTodoList({
                    id: todoListStart.id,
                    afterItemId: todoListEnd.id,
                }))

                // if(todoListStart.order > todoListEnd.order){
                //     await dispatch(reorderTodoList({
                //         id: todoListEnd.id,
                //         afterItemId: todoListStart.id,
                //     }))
                // }
                //
                // if(todoListStart.order < todoListEnd.order){
                //     await dispatch(reorderTodoList({
                //         id: todoListStart.id,
                //         afterItemId: todoListEnd.id,
                //     }))
                // }

                await dispatch(fetchTodoLists())
            }
        }
        dragItem.current = null;
        dragOverItem.current = null;
    };

    if (!isLoggedIn) {
        return <Navigate to={'login'}/>
    }

    return (
        <Grid container spacing={3} className={style.todoListsContainer}>
            {
                todoLists.map((todoList) =>
                    <Grid item
                          key={todoList.order}
                    >
                        <Paper className={style.todoListItem}
                               draggable
                               onDragStart={() => dragStart(todoList.order)}
                               onDragEnter={() => dragEnter(todoList.order)}
                               onDragEnd={drop}
                               onDragOver={(e) => e.preventDefault()}>
                            <TodoListItem todoList={todoList}/>
                        </Paper>
                    </Grid>
                )
            }
        </Grid>
    );
};

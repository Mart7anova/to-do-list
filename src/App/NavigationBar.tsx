import React, {useCallback} from 'react';
import {AppBar, Button, Toolbar} from '@material-ui/core';
import style from './styles/NavigationBar.module.scss'
import {useAppDispatch} from '../hooks/hooks';
import {logout} from '../reducers/auth-reducer';
import {AddItemForm} from '../components/AddItemForm';
import {createTodoList} from '../reducers/todoList-reducer';

export const NavigationBar = () => {
    const dispatch = useAppDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodoList(title))
    }, [dispatch])

    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [dispatch])



    return (
        <AppBar className={style.AppBar} position={'static'} color={'default'}>
            <Toolbar className={style.Toolbar}>
                <h1 className={style.heading}>TO-DO LIST APP</h1>
                <div className={style.addItemContainer}>
                    <AddItemForm addItem={addTodoList} itemTitle={'to-do list'}/>
                </div>
                <Button className={style.logoutButton}
                        variant={'outlined'}
                        color={'default'}
                        disableElevation
                        onClick={logoutHandler}
                >Log out
                </Button>
            </Toolbar>
        </AppBar>
    );
};

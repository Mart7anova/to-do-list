import React, {useCallback} from 'react';
import {AppBar, Button, Toolbar} from '@material-ui/core';
import style from './styles/NavigationBar.module.scss'
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {logout} from '../reducers/auth-reducer';
import {AddItemForm} from '../components/AddItemForm';
import {createTodoList} from '../reducers/todoList-reducer';
import {ProgressLine} from '../components/ProgressLine';

export const NavigationBar = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodoList(title))
    }, [dispatch])

    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [dispatch])


    return (
        <AppBar className={style.AppBar} position={'fixed'}>
            <Toolbar className={style.Toolbar} style={{justifyContent: isLoggedIn ? '' : 'center'}}>
                <h1 className={style.heading}>TO-DO LIST APP</h1>
                {
                    isLoggedIn &&
                    <div className={style.addItemContainer}>
                        <AddItemForm addItem={addTodoList} itemTitle={'to-do list'}/>
                    </div>
                }
                {
                    isLoggedIn &&
                    <Button className={style.logoutButton}
                            variant={'outlined'}
                            color={'default'}
                            disableElevation
                            onClick={logoutHandler}
                    >Log out
                    </Button>
                }
            </Toolbar>
            <ProgressLine/>
        </AppBar>
    );
};

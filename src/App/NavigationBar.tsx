import React, {useCallback} from 'react';
import {AppBar, Button, Toolbar} from '@material-ui/core';
import style from './NavigationBar.module.scss'
import {AddTodoListFrom} from './AddTodoListFrom';
import {useAppDispatch} from '../hooks/hooks';
import {logout} from '../reducers/auth-reducer';

export const NavigationBar = () => {
    const dispatch = useAppDispatch()

    const logoutHandler = useCallback(()=>{
        dispatch(logout())
    },[dispatch])

    return (
            <AppBar className={style.navigationBar} position="static" color={'default'}>
                <Toolbar>
                    <h1 className={style.heading}>TO-DO LIST APP</h1>
                    <AddTodoListFrom/>
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

import React from 'react';
import {AppBar, Button, Toolbar} from '@material-ui/core';
import style from './NavigationBar.module.scss'
import {AddTodoListFrom} from './AddTodoListFrom';

export const NavigationBar = () => {
    return (
            <AppBar className={style.navigationBar} position="static" color={'default'}>
                <Toolbar>
                    <h1 className={style.heading}>TO-DO LIST APP</h1>
                    <AddTodoListFrom/>
                    <Button className={style.logoutButton} variant={'outlined'} color={'default'} disableElevation>Log out</Button>
                </Toolbar>
            </AppBar>
    );
};

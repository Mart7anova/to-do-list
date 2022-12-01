import React, {useCallback} from 'react';
import {AppBar, Button, Toolbar} from '@material-ui/core';
import style from './styles/NavigationBar.module.scss'
import {useAppSelector} from '../../hooks/hooks';
import {AddItemForm} from './AddItemForm';
import {ProgressLine} from './ProgressLine';
import {createTodoList} from "../../store/sagas/todoList-sagas";
import {useDispatch} from "react-redux";
import {logout} from "../../store/sagas/auth-sagas";

export const NavigationBar = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

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

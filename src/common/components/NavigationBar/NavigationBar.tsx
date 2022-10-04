import React, {useCallback} from 'react';
import {AppBar, Button, Toolbar} from '@material-ui/core';
import style from './NavigationBar.module.scss'
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {authActions} from '../../../features/Auth/';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {todoListsActions} from '../../../features/ToDoList';
import {ProgressLine} from '../ProgressLine/ProgressLine';
import {useAppSelector} from '../../hooks/useAppSelector';
import {selectIsLoggedIn} from '../../../features/Auth/selectors';

const {logout} = authActions
const {createTodoList} = todoListsActions

export const NavigationBar = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
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

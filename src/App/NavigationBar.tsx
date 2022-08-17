import React from 'react';
import {AppBar, Button, IconButton, Toolbar} from '@material-ui/core';
import {Menu} from '@material-ui/icons'
import style from './NavigationBar.module.scss'

export const NavigationBar = () => {
    return (
        <div className={style.navigationBar}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={style.menuButton}
                                edge="start"
                                color="inherit"
                                aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <h1 className={style.heading}>TO DO LIST</h1>
                    <Button color="inherit">Log out</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

import React from 'react';
import {AppBar, Button, Grid, Toolbar} from '@material-ui/core';
import style from './NavigationBar.module.scss'
import {AddItemForm} from '../components/AddItemForm';

export const NavigationBar = () => {
    return (
            <AppBar className={style.navigationBar} position="static" color={'default'}>
                <Toolbar>
                    <h1 className={style.heading}>ADD A NEW TO DO LIST</h1>
                    <Grid className={style.addItemFromContainer}>
                        <AddItemForm/>
                    </Grid>
                    <Button className={style.logoutButton} variant={'contained'} color={'default'} disableElevation>Log out</Button>
                </Toolbar>
            </AppBar>
    );
};

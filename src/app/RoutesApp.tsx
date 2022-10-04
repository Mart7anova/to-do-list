import React from 'react';
import style from './App.module.scss';
import {Navigate, Route, Routes} from 'react-router-dom';
import {TodoList} from '../features/ToDoList/TodoList';
import {PageNotFound} from '../common/components/PageNotFound/PageNotFound';
import {Login} from '../features/Auth/Login';
import Container from '@material-ui/core/Container';

export const RoutesApp = () => {
    return (
        <Container fixed className={style.elementsContainer} >
            <Routes>
                <Route path={'/'} element={<TodoList/>}/>
                <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                <Route path={'404'} element={<PageNotFound/>}/>
                <Route path={'login'} element={<Login/>}/>
            </Routes>
        </Container>
    );
};

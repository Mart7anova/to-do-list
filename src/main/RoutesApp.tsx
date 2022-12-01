import React from 'react';
import style from './styles/App.module.scss';
import {Navigate, Route, Routes} from 'react-router-dom';
import {TodoLists} from './TodoLists';
import {PageNotFound} from '../common/components/PageNotFound';
import {Login} from './Login';
import Container from '@material-ui/core/Container';

export const RoutesApp = () => {
    return (
        <Container fixed className={style.elementsContainer} >
            <Routes>
                <Route path={'/'} element={<TodoLists/>}/>
                <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                <Route path={'404'} element={<PageNotFound/>}/>
                <Route path={'login'} element={<Login/>}/>
            </Routes>
        </Container>
    );
};

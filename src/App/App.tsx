import Container from '@material-ui/core/Container';
import React, {useEffect} from 'react';
import {TodoLists} from './TodoLists';
import {NavigationBar} from './NavigationBar';
import {Login} from './Login';
import {Route, Routes} from 'react-router-dom';
import {PageNotFound} from './PageNotFound';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {Loading} from './Loading';
import {initializeApp} from '../reducers/app-reducer';

function App() {
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(initializeApp())
    },[dispatch])

    if (!isInitialized) {
        return <Loading/>
    }
    return (
        <div className="App">
            <NavigationBar/>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodoLists/>}/>
                    <Route path={'*'} element={<PageNotFound/>}/>
                    <Route path={'login'} element={<Login/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;

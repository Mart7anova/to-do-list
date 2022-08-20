import Container from '@material-ui/core/Container';
import React from 'react';
import {TodoLists} from './TodoLists';
import {NavigationBar} from './NavigationBar';
import {Login} from './Login';
import {Route, Routes} from 'react-router-dom';
import {PageNotFound} from './PageNotFound';

function App() {
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

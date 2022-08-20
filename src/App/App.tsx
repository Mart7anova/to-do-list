import Container from '@material-ui/core/Container';
import React from 'react';
import {TodoLists} from './TodoLists';
import {NavigationBar} from './NavigationBar';
import {Login} from './Login';

function App() {
    return (
        <div className="App">
            <NavigationBar/>
            <Login/>
            <Container fixed>
                <TodoLists/>
            </Container>
        </div>
    );
}

export default App;

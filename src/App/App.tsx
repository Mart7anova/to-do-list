import Container from '@material-ui/core/Container';
import React from 'react';
import {TodoLists} from './TodoLists';
import {NavigationBar} from './NavigationBar';

function App() {

    return (
        <div className="App">
            <NavigationBar/>
            <Container fixed>
                <TodoLists/>
            </Container>
        </div>
    );
}

export default App;

import Container from '@material-ui/core/Container';
import React from 'react';
import {TodoLists} from './TodoLists';

function App() {

    return (
        <div className="App">
            <Container fixed>
                <TodoLists/>
            </Container>
        </div>
    );
}

export default App;

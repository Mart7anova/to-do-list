import Container from '@material-ui/core/Container';
import React, {useEffect} from 'react';
import {TodoLists} from './TodoLists';
import {NavigationBar} from './NavigationBar';
import {Login} from './Login';
import {Navigate, Route, Routes} from 'react-router-dom';
import {PageNotFound} from './PageNotFound';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {Loading} from './Loading';
import {initializeApp} from '../reducers/app-reducer';
import {ErrorSnackbar} from '../components/ErrorSnackbar';
import style from './styles/App.module.scss'
import background from '../assets/photo/background.jpg'

function App() {
    const img = {
        backgroundImage: `url(${background})`
    }

    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    if (!isInitialized) {
        return <Loading/>
    }
    return (
        <div className={'App'}>
            <NavigationBar/>

            <div className={style.backGroundImg} style={img}>
                <Container fixed className={style.elementsContainer} >
                    <Routes>
                        <Route path={'/'} element={<TodoLists/>}/>
                        <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                        <Route path={'404'} element={<PageNotFound/>}/>
                        <Route path={'login'} element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;

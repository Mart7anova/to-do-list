import React, {useEffect} from 'react';
import {NavigationBar} from './components/NavigationBar';
import {useAppDispatch} from './hooks/useAppDispatch';
import {Loading} from './components/common/Loading';
import {initializeApp} from './store/reducers/app-reducer';
import {ErrorSnackbar} from './components/common/ErrorSnackbar';
import style from './App.module.scss'
import background from './assets/photo/background.jpg'
import {RoutesApp} from './components/RoutesApp';
import {useAppSelector} from './hooks/useAppSelector';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
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
                <RoutesApp/>
                <ErrorSnackbar/>
            </div>
        </div>
    );
}

export default App;

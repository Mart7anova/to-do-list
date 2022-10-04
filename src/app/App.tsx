import React, {useEffect} from 'react';
import {NavigationBar} from '../common/components/NavigationBar/NavigationBar';
import {useAppDispatch} from '../common/hooks/useAppDispatch';
import {Loading} from '../common/components/Loading/Loading';
import {ErrorSnackbar} from '../common/components/ErrorSnackbar/ErrorSnackbar';
import style from './App.module.scss'
import background from '../common/assets/photo/background.jpg'
import {RoutesApp} from './RoutesApp';
import {useAppSelector} from '../common/hooks/useAppSelector';
import {appActions} from '../features/Application'

const {initializeApp} = appActions

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

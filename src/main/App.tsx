import React, {useEffect} from 'react';
import {NavigationBar} from '../common/components/NavigationBar';
import {useAppSelector} from '../hooks/hooks';
import {Loading} from '../common/components/Loading';
import {ErrorSnackbar} from '../common/components/ErrorSnackbar';
import style from './styles/App.module.scss'
import background from '../common/photo/background.jpg'
import {RoutesApp} from './RoutesApp';
import {useDispatch} from "react-redux";
import {initializeApp} from "../store/sagas/app-sagas";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const img = {
        backgroundImage: `url(${background})`
    }

    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const dispatch = useDispatch()

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

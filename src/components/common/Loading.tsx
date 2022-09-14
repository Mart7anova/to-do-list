import React from 'react';
import loading from '../../assets/gif/loading.gif'
import style from '../styles/Loading.module.scss'

export const Loading = () => {
    return (
        <div className={style.loadingContainer}>
            <img src={loading} alt={'Loading...'}/>
        </div>
    );
};
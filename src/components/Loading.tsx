import React from 'react';
import loading from '../common/gif/loading.gif'
import style from '../main/styles/Loading.module.scss'

export const Loading = () => {
    return (
        <div className={style.loadingContainer}>
            <img src={loading} alt={'Loading...'}/>
        </div>
    );
};
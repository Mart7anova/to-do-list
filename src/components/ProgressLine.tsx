import React from 'react';
import {LinearProgress} from '@material-ui/core';
import {useAppSelector} from '../hooks/hooks';

export const ProgressLine = () => {
    const requestStatus = useAppSelector(state => state.app.requestStatus)

    return (<>
            {requestStatus === 'loading' && <LinearProgress color={'secondary'}/>}
        </>
    );
};

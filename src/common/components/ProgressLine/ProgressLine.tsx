import React from 'react';
import {LinearProgress} from '@material-ui/core';
import {useAppSelector} from '../../hooks/useAppSelector';

export const ProgressLine = () => {
    const requestStatus = useAppSelector(state => state.app.status)

    return (<>
            {requestStatus === 'loading' && <LinearProgress color={'secondary'}/>}
        </>
    );
};

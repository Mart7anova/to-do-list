import React from 'react';
import {Snackbar} from '@material-ui/core';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {appActions} from '../../../features/Application';
import {useAppSelector} from '../../hooks/useAppSelector';

const {setAppError} = appActions

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const ErrorSnackbar = () => {
    const error = useAppSelector(state => state.app.error)
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppError({error: null}))
    }

    return (
        <Snackbar open={!!error} autoHideDuration={5000} onClose={handleClose}>
            <Alert severity={'error'} onClose={handleClose}>{error}</Alert>
        </Snackbar>
    );
};

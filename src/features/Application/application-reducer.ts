import {authAPI} from '../../api/ToDolist-api';
import {handleServerNetworkError} from '../../common/utils/error-utils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {appActions} from './index';
import {authActions} from '../Auth';


const initializeApp = createAsyncThunk('application/initializeApp', async (param, thunkAPI) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(authActions.setIsLoggedIn(true))
        }
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})

export const asyncActions = {
    initializeApp
}

export const slice = createSlice({
    name: 'app',
    initialState: {
        isInitialized: false,
        error: null as ErrorType,
        status: 'idle' as StatusType,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initializeApp.fulfilled, (state) => {
                state.isInitialized = true
            })
            .addCase(appActions.setAppStatus, (state, action) => {
                state.status = action.payload.status
            })
            .addCase(appActions.setAppError, (state, action) => {
                state.error = action.payload.error
            })
    }

})


//types
export type ErrorType = null | string

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
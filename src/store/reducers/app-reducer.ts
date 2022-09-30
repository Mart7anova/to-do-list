import {authAPI} from '../../api/api';
import {handleServerNetworkError} from '../../utils/error-utils';
import {setIsLoggedIn} from './auth-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';


export const initializeApp = createAsyncThunk('app/initializeApp', async (param, thunkAPI) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedIn(true))
        }
    } catch (e) {
        const error = e as Error | AxiosError<{error: string}>
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})


const slice = createSlice({
    name: 'app',
    initialState: {
        isInitialized: false,
        error: null as ErrorType,
        requestStatus: 'idle' as RequestStatusType,
    },
    reducers: {
        setAppError(state, action: PayloadAction<ErrorType>) {
            state.error = action.payload
        },
        setRequestStatus(state, action: PayloadAction<RequestStatusType>) {
            state.requestStatus = action.payload
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(initializeApp.fulfilled, (state)=>{
            state.isInitialized = true
        })
    }
})

export const appReducer = slice.reducer
export const {
    setAppError,
    setRequestStatus
} = slice.actions


//types
export type ErrorType = null | string

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
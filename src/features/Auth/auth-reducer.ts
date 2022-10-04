import {FieldErrorsType, LoginParamsType} from '../../api/types';
import {handleServerAppError, handleServerNetworkError} from '../../common/utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {authAPI} from '../../api/ToDolist-api';
import {appActions} from '../Application'


const login = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: String[], fieldsErrors?: FieldErrorsType } }>
('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({status:'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode !== 0) {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    } finally {
        thunkAPI.dispatch(appActions.setAppStatus({status:'succeeded'}))
    }
})

const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({status:'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode !== 0) {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    } finally {
        thunkAPI.dispatch(appActions.setAppStatus({status:'succeeded'}))
    }
})

export const asyncAction = {
    login,
    logout
}

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }
})





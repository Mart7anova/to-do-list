import {authAPI, FieldErrorsType, LoginParamsType} from '../../api/api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {setRequestStatus} from './app-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';


export const login = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: String[], fieldsErrors?: FieldErrorsType } }>
('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setRequestStatus('loading'))
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
        thunkAPI.dispatch(setRequestStatus('succeeded'))
    }
})

export const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setRequestStatus('loading'))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode !== 0) {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        handleServerNetworkError(error, thunkAPI.dispatch)
    } finally {
        thunkAPI.dispatch(setRequestStatus('succeeded'))
    }
})

const slice = createSlice({
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
export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions




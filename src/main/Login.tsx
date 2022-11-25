import React from 'react';
import {useFormik} from 'formik';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    Paper,
    TextField
} from '@material-ui/core';
import style from './styles/Login.module.scss';
import {useAppSelector} from '../hooks/hooks';
import {LoginParamsType} from '../api/api';
import {Navigate} from 'react-router-dom';
import {login} from "../store/sagas/auth-sagas";
import {useDispatch} from "react-redux";

type PropsType = {
    demo?: boolean
}

type FormikErrorsType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = ({demo = false}: PropsType) => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        } as LoginParamsType,
        validate: values => {
            const errors: FormikErrorsType = {}
            if (!values.email) {
                errors.email = 'email required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'password required';
            } else if (values.password.length < 3) {
                errors.password = 'The password is too short'
            }
            return errors
        },
        onSubmit: (values: LoginParamsType) => {
            dispatch(login(values))
        },
    });

    if (isLoggedIn) {
        if (demo === false)
            return <Navigate to={'/'}/>
    }

    return (
        <Grid container justifyContent={'center'}>
            <Paper className={style.paperContainer}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}
                               rel={'noreferrer'}
                            > here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <TextField className={style.TextField}
                                       label={formik.errors.email || 'email'}
                                       error={!!formik.errors.email}
                                       {...formik.getFieldProps('email')}
                                       variant="outlined"
                            />
                            <TextField className={style.TextField}
                                       label={formik.errors.password || 'password'}
                                       error={!!formik.errors.password}
                                       {...formik.getFieldProps('password')}
                                       variant="outlined"
                                       type="password"
                            />
                            <FormControlLabel label={'remember me'}
                                              control={<Checkbox color={'default'}
                                                                 {...formik.getFieldProps('rememberMe')}/>}
                            />
                            <Button type={'submit'}
                                    onSubmit={() => formik.resetForm()}
                                    variant={'outlined'}
                                    color={'default'}
                            >Log in
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </Paper>
        </Grid>
    );
};

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
import {useAppDispatch} from '../hooks/hooks';
import {login} from '../reducers/auth-reducer';

type FormikErrorsType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: values => {
            const errors: FormikErrorsType = {}
            if (!values.email) {
                errors.email = 'email required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if(!values.password){
                errors.password = 'password required';
            }else if (values.password.length < 3){
                errors.password = 'The password is too short'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(login(values))
        },
    });
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
                            <TextField label={formik.errors.email || 'email'}
                                       error={!!formik.errors.email}
                                       {...formik.getFieldProps('email')}
                                       variant="outlined"
                            />
                            <TextField label={formik.errors.password || 'password'}
                                       error={!!formik.errors.password}
                                       {...formik.getFieldProps('password')}
                                       variant="outlined"
                            />
                            <FormControlLabel control={<Checkbox color={'default'}/>}
                                              label={'remember me'}
                                              {...formik.getFieldProps('rememberMe')}
                            />
                            <Button variant={'outlined'}
                                    color={'default'}
                                    disableElevation
                            >Submit
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </Paper>
        </Grid>
    );
};

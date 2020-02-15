import React, { useState, useEffect } from 'react';
import axios from 'axios';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI, SET_USER, SET_ERRORS } from '../redux/types';
//MUI
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
//Components
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const useStyles = makeStyles({
    progress: {
        position: 'absolute',
        top: '15%',
        left: '30%',
    }
});

const Login = (props) => {
    const classes = useStyles();
    const UI = useSelector(state => state.UI);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() =>{
        dispatch({
            type: CLEAR_ERRORS
        });
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: LOADING_UI
        });
        const loginData = {
            email: email,
            password: password
        };
        axios.post('http://localhost:4000/login', loginData)
            .then(res => {
                dispatch({
                    type: STOP_LOADING_UI
                });
                dispatch({
                    type: SET_USER,
                    payload: res.data.data
                });
                const auth = {
                    token: res.data.data.token,
                    role: res.data.data.user.role.role,
                    id: res.data.data.user._id
                }
                const authToken = `Bearer ${res.data.data.token}`;
                axios.defaults.headers.common['Authorization'] = authToken;
                sessionStorage.setItem('auth', JSON.stringify(auth));
                props.history.push('/');
            })
            .catch(err => {
                dispatch({
                    type: STOP_LOADING_UI
                })
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response
                });
            })
        
    }

    return (
        <main className="container">
            <div className="login-form">
                <h3>Logowanie</h3>
                <form onSubmit={handleSubmit}>
                    {UI.errors ? UI.errors.data ? (<div className="alert-message">{UI.errors.data.error}</div>) : null : null}
                    <CustomInput value={email} type="text" name="email" label="Email" onChange={e => setEmail(e.target.value)} />
                    <CustomInput value={password} type="password" name="password" label="Hasło" onChange={e => setPassword(e.target.value)} />
                    <div className="form-control">
                        <CustomButton
                            color="primary"
                            disabled={UI.loading}
                        >
                            Zaloguj
                            {UI.loading && <CircularProgress className={classes.progress} size={25} />}
                        </CustomButton>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Login;

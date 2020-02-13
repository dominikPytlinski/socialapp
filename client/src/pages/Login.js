import React, { useState, useEffect } from 'react';
import axios from 'axios';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI, SET_USER, SET_ERRORS } from '../redux/types';
//MUI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//Components
import Loading from '../components/Loading';

const Login = (props) => {
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
            {UI.loading && (<div className="curtain"><Loading /></div>)}
            <div className="login-form">
                <h3 className="form-title">Logowanie</h3>
                <form className="form" onSubmit={handleSubmit}>
                    {UI.errors && (<div className="alert-message">{UI.errors.data.error}</div>)}
                    <TextField type="email" label="Email" fullWidth onChange={e => setEmail(e.target.value)} />
                    <TextField margin="normal" label="Hasło" type="password" fullWidth onChange={e => setPassword(e.target.value)} />
                    <div className="form-control">
                        <Button variant="contained" color="primary" type="submit">
                            Zaloguj
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Login;

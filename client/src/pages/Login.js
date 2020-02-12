import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { loginUser, clearUserErrors } from '../redux/actions/userActions';
import Loading from '../components/Loading';

const Login = ({UI, loginUser, clearUserErrors, history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() =>{
        clearUserErrors();
    }, [clearUserErrors])

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            email: email,
            password: password
        }
        loginUser(loginData, history);
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

Login.propTypes = {
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    clearUserErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
});

const mapActionToProps = {
    loginUser,
    clearUserErrors
}

export default connect(mapStateToProps, mapActionToProps)(Login);

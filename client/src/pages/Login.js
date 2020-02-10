import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser, clearUserErrors } from '../redux/actions/userActions';
import Loading from '../components/Loading';

const Login = ({user, UI,  loginUser, clearUserErrors, history}) => {
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
                <form className="form" onSubmit={handleSubmit}>
                    {UI.errors && (<div className="alert-message">{UI.errors.data.error}</div>)}
                    <div className="form-control">
                        <label htmlFor="email">
                            Email:
                        </label>
                        <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">
                            Hasło:
                        </label>
                        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <button className="btn btn-primary" type="submit">
                            Zaloguj
                        </button>
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

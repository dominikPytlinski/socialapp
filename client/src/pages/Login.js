import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../redux/actions/userActions';
import CurtainLoading from '../components/CurtainLoading';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user: { loading, logged, role, token}, loginUser } = props

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            email: email,
            password: password
        }
        loginUser(loginData);
    }

    return (
        <main className="container">
            {loading && <CurtainLoading />}
            <div className="login-form">
                <form className="form" onSubmit={handleSubmit}>
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
    loginUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user
});

const mapActionToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionToProps)(Login);

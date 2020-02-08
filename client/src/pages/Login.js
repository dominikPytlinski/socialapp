import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            email: email,
            password: password
        }
        axios.post('http://localhost:4000/login', loginData)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }

    return (
        <main className="container">
            <div className="login-form">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label htmlFor="email">
                            Email:
                        </label>
                        <input type="email" name="email" id="email" value={email} onChange={handleChangeEmail} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">
                            Hasło:
                        </label>
                        <input type="password" name="password" id="password" value={password} onChange={handleChangePassword} />
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

export default Login;
import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:4000/login', loginData)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <main className="container">
                <form onSubmit={this.handleSubmit} className="login-form" >
                    <div className="form-control">
                        <input type="email" id="email" className="input" name="email" value={this.state.email} onChange={this.handleChange} />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-control">
                        <input placeholder="" type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} />
                        <label htmlFor="password">Hasło</label>
                    </div>
                    <button type="submit">Zaloguj</button>
                </form>
            </main>
        )
    }
}

export default Login

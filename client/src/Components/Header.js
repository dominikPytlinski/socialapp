import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <Fragment>
                <header className="main-nav">
                    <div className="logo">
                        Logo
                    </div>
                    <ul>
                        <li><NavLink exact to="/" activeClassName="selected" className="nav-link">Home</NavLink></li>
                        <li><NavLink to="/login" activeClassName="selected" className="nav-link">Login</NavLink></li>
                        <li><NavLink to="/signup" activeClassName="selected" className="nav-link">Signup</NavLink></li>
                    </ul>
                </header>
            </Fragment>
        )
    }
}

export default Header

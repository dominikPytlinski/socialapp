import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
 
const Header = ({ user }) => {
    return (
        <header className="header">
            <div className="logo">
                <span>Logo</span>
            </div>
            <div className="main-nav">
                {user.logged ? (
                    <ul className="main-menu">
                        <li className="main-menu-item">
                            <NavLink exact to='/' activeClassName="main-menu-active" >Główna</NavLink>
                        </li>
                    </ul>
                ) : (
                    <ul className="main-menu">
                        <li className="main-menu-item">
                            <NavLink exact to='/' activeClassName="main-menu-active" >Główna</NavLink>
                        </li>
                        <li className="main-menu-item">
                            <NavLink to='/login' activeClassName="main-menu-active" >Logowanie</NavLink>
                        </li>
                        <li className="main-menu-item">
                            <NavLink to='/signup' activeClassName="main-menu-active" >Rejestracja</NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </header>
    )
}

Header.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToPropas = state => ({
    user: state.user
});

export default connect(mapStateToPropas, null)(Header);


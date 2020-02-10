import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../redux/actions/userActions';
import AddPost from './AddPost';
 
const Header = ({ user, logoutUser }) => {
    return (
        <header className="header">
            <div className="logo">
                <span>Logo</span>
            </div>
            <div className="main-nav">
                {user.logged ? (
                    <ul className="main-menu">
                        <li className="main-menu-item">
                            <NavLink exact to='/' activeClassName="main-menu-active" ><span>Główna</span></NavLink>
                        </li>
                        <li className="main-menu-item">
                            <AddPost />
                        </li>
                        <li className="main-menu-item">
                            <NavLink to='#'>
                                <span onClick={(e) => logoutUser()}>Wyloguj</span>
                            </NavLink>
                        </li>
                    </ul>
                ) : (
                    <ul className="main-menu">
                        <li className="main-menu-item">
                            <NavLink exact to='/' activeClassName="main-menu-active" ><span>Główna</span></NavLink>
                        </li>
                        <li className="main-menu-item">
                            <NavLink to='/login' activeClassName="main-menu-active" ><span>Logowanie</span></NavLink>
                        </li>
                        <li className="main-menu-item">
                            <NavLink to='/signup' activeClassName="main-menu-active" ><span>Rejestracja</span></NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </header>
    )
}

Header.propTypes = {
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToPropas = state => ({
    user: state.user
});

export default connect(mapStateToPropas, { logoutUser })(Header);


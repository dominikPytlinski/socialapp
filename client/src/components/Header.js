import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <span>Logo</span>
            </div>
            <div className="main-nav">
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
            </div>
        </header>
    )
}

export default Header;


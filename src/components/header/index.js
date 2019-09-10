import React from 'react';
import './header.css';
import logo from './logo.jpg';

const Header = () => {
  return (
    <nav className='header'>
      <div className="nav-wrapper">
        <img className='logo' src={logo} alt='logo' />
        <div className='title'>Справочник отделений новой почты</div>
      </div>
    </nav>
  )
}

export default Header;
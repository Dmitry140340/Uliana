import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">КиноКаталог</Link>
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Главная</Link>
        <Link to="/add" className={`nav-link ${location.pathname === '/add' ? 'active' : ''}`}>Добавить фильм</Link>
        <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>О нас</Link>
      </div>
    </nav>
  );
};

export default Navbar;

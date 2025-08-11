import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const linkStyle = {
    marginRight: 20,
    padding: '8px 12px',
    borderRadius: '8px',
    color: 'white',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
  };

  const activeStyle = {
    backgroundColor: 'rgba(255, 106, 0, 0.8)', // Accent orange background for active link
    boxShadow: '0 0 10px 2px rgba(255, 106, 0, 0.7)',
  };

  return (
    <nav
      style={{
        padding: '10px 30px',
        background: 'rgba(10, 26, 42, 0.85)',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <Link
        to="/"
        style={{
          ...linkStyle,
          ...(location.pathname === '/' ? activeStyle : {}),
        }}
        className="hover-shadow"
      >
        Dashboard
      </Link>
      <Link
        to="/departments"
        style={{
          ...linkStyle,
          ...(location.pathname.startsWith('/departments') ? activeStyle : {}),
        }}
        className="hover-shadow"
      >
        Departments
      </Link>
      <Link
        to="/employees"
        style={{
          ...linkStyle,
          ...(location.pathname.startsWith('/employees') ? activeStyle : {}),
        }}
        className="hover-shadow"
      >
        Employees
      </Link>
    </nav>
  );
};

export default Navbar;

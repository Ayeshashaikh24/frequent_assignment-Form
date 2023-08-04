// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <Link to="/">Create User</Link>
      <h1>User List</h1>
    </div>
  );
};

export default Header;

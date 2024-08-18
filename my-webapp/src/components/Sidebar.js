import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <ul>
        <li className={`mb-4 flex items-center ${isActive('/') ? 'text-purple-600' : ''}`}>
          <FontAwesomeIcon icon={faTh} className="mr-2" />
          <Link to="/" className={`text-lg font-semibold ${isActive('/') ? 'text-purple-600' : ''}`}>
            Overview
          </Link>
        </li>
        <li className={`flex items-center ${isActive('/people') ? 'text-purple-600' : ''}`}>
          <FontAwesomeIcon icon={faTh} className="mr-2" />
          <Link to="/people" className={`text-lg font-semibold ${isActive('/people') ? 'text-purple-600' : ''}`}>
            People Directory
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

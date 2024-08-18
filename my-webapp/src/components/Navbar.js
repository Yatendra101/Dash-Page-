import React from 'react';
import { FaBell } from 'react-icons/fa';

const Navbar = ({ currentUser, onSearch }) => {
  console.log('Navbar currentUser:', currentUser); // Log currentUser to debug

  return (
    <nav className="navbar p-4">
      <div className="flex justify-between items-center h-full px-4">
        <h1 className="text-lg font-bold text-purple-600">PEOPLE.CO</h1>
        <div className="flex items-center space-x-4">
          <FaBell className="text-xl cursor-pointer" />
          <div className="flex items-center space-x-2">
            <img
              src={currentUser.image} // Use user image from props
              alt={currentUser.username}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-700">{currentUser.username}</span> {/* Use username from props */}
          </div>
        </div>
      </div>
      <br></br>
      <hr/>
    </nav>
  );
};

export default Navbar;

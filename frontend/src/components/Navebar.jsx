import React from 'react';
import { Link , NavLink} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg sticky top-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
       
        <div className="text-xl font-bold">
          <a href="/" className="hover:text-blue-400">
            MyApp
          </a>
        </div>

   
        <div className="flex gap-4">
          <NavLink
            to="/"
            className= {({ isActive }) => `text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm ${isActive? ` font-extrabold text-white`:`font-medium`}`}
          >
            All Posts
          </NavLink>
          <NavLink
            to="/create"
            className= {({ isActive }) => `text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm ${isActive? `font-extrabold text-white`:`font-medium`}`}
          >
            Create Post
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


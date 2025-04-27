import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('chefSyUser') || '{}');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('chefSyUser');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 flex justify-between items-center">
        <NavLink to="/" className="text-2xl sm:text-3xl font-bold text-orange-600">
          chef sy
        </NavLink>
        {/* Hamburger Menu for Mobile */}
        <button
          className="sm:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } sm:flex flex-col sm:flex-row sm:space-x-4 items-center absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent p-4 sm:p-0 z-10`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-base sm:text-lg ${isActive ? 'text-orange-600 font-semibold' : 'text-gray-600 hover:text-orange-600'} mb-2 sm:mb-0`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-chefs"
            className={({ isActive }) =>
              `text-base sm:text-lg ${isActive ? 'text-orange-600 font-semibold' : 'text-gray-600 hover:text-orange-600'} mb-2 sm:mb-0`
            }
          >
            Chefs
          </NavLink>
          <NavLink
            to="/book-chef"
            className={({ isActive }) =>
              `text-base sm:text-lg ${isActive ? 'text-orange-600 font-semibold' : 'text-gray-600 hover:text-orange-600'} mb-2 sm:mb-0`
            }
          >
            Book Now
          </NavLink>
          {user.id ? (
            <>
              <NavLink
                to={user.role === 'customer' ? '/dashboard' : '/chef-dashboard'}
                className={({ isActive }) =>
                  `text-base sm:text-lg ${isActive ? 'text-orange-600 font-semibold' : 'text-gray-600 hover:text-orange-600'} mb-2 sm:mb-0`
                }
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-base sm:text-lg text-gray-600 hover:text-orange-600 font-semibold mb-2 sm:mb-0"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `text-base sm:text-lg ${isActive ? 'text-orange-600 font-semibold' : 'text-gray-600 hover:text-orange-600'} mb-2 sm:mb-0`
                }
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-base sm:text-lg ${isActive ? 'text-orange-600 font-semibold' : 'text-gray-600 hover:text-orange-600'} mb-2 sm:mb-0`
                }
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
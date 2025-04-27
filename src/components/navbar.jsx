import React from 'react';
import { NavLink, useNavigate } from 'react-router';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('chefSyUser') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('chefSyUser');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-orange-600">
          chef sy
        </NavLink>
        <div className="flex space-x-4 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-orange-600 font-semibold'
                : 'text-gray-600 hover:text-orange-600'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-chefs"
            className={({ isActive }) =>
              isActive
                ? 'text-orange-600 font-semibold'
                : 'text-gray-600 hover:text-orange-600'
            }
          >
            Chefs
          </NavLink>
          <NavLink
            to="/book-chef"
            className={({ isActive }) =>
              isActive
                ? 'text-orange-600 font-semibold'
                : 'text-gray-600 hover:text-orange-600'
            }
          >
            Book Now
          </NavLink>
          {user.id ? (
            <>
              <NavLink
                to={user.role === 'customer' ? '/dashboard' : '/chef-dashboard'}
                className={({ isActive }) =>
                  isActive
                    ? 'text-orange-600 font-semibold'
                    : 'text-gray-600 hover:text-orange-600'
                }
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-orange-600 font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? 'text-orange-600 font-semibold'
                    : 'text-gray-600 hover:text-orange-600'
                }
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? 'text-orange-600 font-semibold'
                    : 'text-gray-600 hover:text-orange-600'
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
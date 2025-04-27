import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router'; 
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/solid';

const mockUsers = [
  { id: 1, email: 'john.doe@example.com', password: 'password123', role: 'customer' },
  { id: 2, email: 'chef.simon@example.com', password: 'chef123', role: 'chef' },
];

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const user = mockUsers.find(
      (u) => u.email === formData.email && u.password === formData.password
    );
    if (!user) {
      setErrors({ submit: 'Invalid email or password' });
      return;
    }
    localStorage.setItem('chefSyUser', JSON.stringify(user));
    setErrors({});
    navigate(user.role === 'customer' ? '/dashboard' : '/chef-dashboard');
  };

  return (
    <div className="bg-white py-8 sm:py-16 min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="max-w-md mx-auto bg-gray-50 rounded-2xl shadow-md p-4 sm:p-6">
          <h1 className="text-center text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">
            Log In to <span className="text-orange-600">Chef Sy</span>
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 sm:p-3 pl-8 sm:pl-10 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                  placeholder="Enter your email"
                />
                <UserIcon className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 sm:p-3 pl-8 sm:pl-10 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                  placeholder="Enter your password"
                />
                <LockClosedIcon className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              {errors.password && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-green-600 transition-colors duration-300 text-sm sm:text-base"
            >
              Log In
            </button>
            {errors.submit && <p className="text-red-500 text-xs sm:text-sm text-center">{errors.submit}</p>}
          </form>
          <p className="text-center text-gray-600 text-sm sm:text-base mt-4 sm:mt-6">
            Don’t have an account?{' '}
            <NavLink to="/register" className="text-orange-600 hover:underline">
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
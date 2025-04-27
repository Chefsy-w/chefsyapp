import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { UserIcon, CakeIcon } from '@heroicons/react/24/solid';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer', // Default to customer
  });
  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Basic form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirm password is required';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    if (!formData.role) newErrors.role = 'Please select a role';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Mock API submission
    try {
      console.log('Submitting:', formData);
      // Example: POST to /signup
      /*
      const response = await fetch('https://api.chefsy.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Signup failed');
      const data = await response.json();
      console.log('Signup success:', data);
      */
      setErrors({});
      alert('Signup successful! Redirecting to login...');
      navigate('/login');
    } catch (error) {
      setErrors({ submit: 'Signup failed. Please try again.' });
      console.error(error);
    }
  };

  return (
    <section className="bg-white py-16 min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="max-w-md mx-auto bg-gray-50 rounded-2xl shadow-md p-6 sm:p-8">
          <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Join <span className="text-orange-600">Chef Sy</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sign up as
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={formData.role === 'customer'}
                    onChange={handleChange}
                    className="form-radio text-orange-600"
                  />
                  <UserIcon className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700">Customer</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="chef"
                    checked={formData.role === 'chef'}
                    onChange={handleChange}
                    className="form-radio text-orange-600"
                  />
                  <CakeIcon className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700">Chef</span>
                </label>
              </div>
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-3 px-6 rounded-full hover:bg-orange-600 transition-colors duration-300"
            >
              Sign Up
            </button>

            {/* Submission Error */}
            {errors.submit && <p className="text-red-500 text-sm text-center">{errors.submit}</p>}
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <NavLink to="/login" className="text-orange-600 hover:underline">
              Log in
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
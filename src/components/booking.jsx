import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { CalendarIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/solid';

const Booking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    chef: '',
    date: '',
    time: '',
    location: '',
    requests: '',
  });
  const [errors, setErrors] = useState({});

  const chefs = [
    { id: 1, name: 'Simon Simons' },
    { id: 2, name: 'Ewurabena Smith-Arthur' },
    { id: 3, name: 'Araba Forson' },
    { id: 4, name: 'Fel Gifty Opare' },
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Basic form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.chef) newErrors.chef = 'Please select a chef';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
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

    try {
      console.log('Submitting:', formData);
      setErrors({});
      alert('Booking submitted successfully! Redirecting to home...');
      navigate('/');
    } catch (error) {
      setErrors({ submit: 'Booking failed. Please try again.' });
      console.error(error);
    }
  };

  return (
    <section className="bg-white py-8 sm:py-16 min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="max-w-md mx-auto bg-gray-50 rounded-2xl shadow-md p-6 sm:p-8">
          <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
            Book a <span className="text-orange-600">Chef Sy</span> Experience
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Chef Selection */}
            <div>
              <label
                htmlFor="chef"
                className="block text-sm sm:text-base font-medium text-gray-700"
              >
                Select Chef
              </label>
              <select
                id="chef"
                name="chef"
                value={formData.chef}
                onChange={handleChange}
                className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
              >
                <option value="">Choose a chef</option>
                {chefs.map((chef) => (
                  <option key={chef.id} value={chef.name}>
                    {chef.name}
                  </option>
                ))}
              </select>
              {errors.chef && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.chef}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm sm:text-base font-medium text-gray-700"
              >
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                />
                <CalendarIcon className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              {errors.date && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.date}</p>
              )}
            </div>

            {/* Time */}
            <div>
              <label
                htmlFor="time"
                className="block text-sm sm:text-base font-medium text-gray-700"
              >
                Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                />
                <ClockIcon className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              {errors.time && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.time}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm sm:text-base font-medium text-gray-700"
              >
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                  placeholder="Enter event location"
                />
                <MapPinIcon className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              {errors.location && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.location}</p>
              )}
            </div>

            {/* Special Requests */}
            <div>
              <label
                htmlFor="requests"
                className="block text-sm sm:text-base font-medium text-gray-700"
              >
                Special Requests (Optional)
              </label>
              <textarea
                id="requests"
                name="requests"
                value={formData.requests}
                onChange={handleChange}
                className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                placeholder="Any dietary preferences or special instructions?"
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-orange-600 transition-colors duration-300 text-sm sm:text-base"
            >
              Submit Booking
            </button>

            {/* Submission Error */}
            {errors.submit && (
              <p className="text-red-500 text-xs sm:text-sm text-center">{errors.submit}</p>
            )}
          </form>

          {/* Back to Home Link */}
          <p className="text-center text-gray-600 mt-4 sm:mt-6 text-sm sm:text-base">
            Changed your mind?{' '}
            <NavLink to="/" className="text-orange-600 hover:underline">
              Back to Home
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Booking;
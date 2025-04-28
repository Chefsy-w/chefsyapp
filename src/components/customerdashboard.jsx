import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { UserIcon, CalendarIcon, BookmarkIcon, CogIcon, BellIcon } from '@heroicons/react/24/solid';

// Mock authentication
const mockUser = { role: 'customer', id: 1 }

const CustomerDashboard = () => {
  const navigate = useNavigate();
  // Profile state
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    avatar: null,
  });
  // Bookings state
  const [bookings, setBookings] = useState([]);
  // Notifications state
  const [notifications, setNotifications] = useState([]);
  const [avatarFile, setAvatarFile] = useState(null);
  const [errors, setErrors] = useState({});

  // Load data from localStorage on mount
  useEffect(() => {
    // Load profile
    const savedProfile = localStorage.getItem('chefSyProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      setProfile({
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '',
        address: '',
        avatar: null,
      });
    }

    // Load bookings
    const savedBookings = localStorage.getItem('chefSyBookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      setBookings([
        {
          id: 1,
          chef: 'Simon Simons',
          date: '2025-05-10',
          time: '18:00',
          location: '123 Main St',
          status: 'Confirmed',
        },
        {
          id: 2,
          chef: 'Fel Gifty Opare',
          date: '2025-06-15',
          time: '19:30',
          location: '456 Oak Ave',
          status: 'Pending',
        },
      ]);
    }

    // Load notifications
    const savedNotifications = localStorage.getItem('chefSyNotifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    } else {
      setNotifications([
        { id: 1, message: 'Booking with Simon Simons confirmed!', date: '2025-04-20' },
        { id: 2, message: 'New chef joined Chef Sy!', date: '2025-04-22' },
      ]);
    }
  }, []);

  // Save profile to localStorage
  useEffect(() => {
    localStorage.setItem('chefSyProfile', JSON.stringify(profile));
  }, [profile]);

  // Save bookings to localStorage
  useEffect(() => {
    localStorage.setItem('chefSyBookings', JSON.stringify(bookings));
  }, [bookings]);

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem('chefSyNotifications', JSON.stringify(notifications));
  }, [notifications]);

  // Handle profile input changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ avatar: 'Image must be under 2MB' });
        return;
      }
      const url = URL.createObjectURL(file);
      setAvatarFile(file);
      setProfile((prev) => ({ ...prev, avatar: url }));
      setErrors((prev) => ({ ...prev, avatar: null }));
    }
  };

  // Validate profile form
  const validateProfile = () => {
    const newErrors = {};
    if (!profile.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!profile.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = 'Invalid email format';
    }
    return newErrors;
  };

  // Save profile
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateProfile();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      console.log('Saving profile:', { ...profile, avatarFile });
      setErrors({});
      alert('Profile updated successfully!');
    } catch (error) {
      setErrors({ submit: 'Profile update failed. Please try again.' });
      console.error(error);
    }
  };

  // Cancel booking
  const cancelBooking = (id) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
    setNotifications((prev) => [
      ...prev,
      {
        id: Date.now(),
        message: `Booking #${id} cancelled`,
        date: new Date().toISOString().split('T')[0],
      },
    ]);
    alert('Booking cancelled!');
  };

  // Clear notifications
  const clearNotifications = () => {
    setNotifications([]);
    alert('Notifications cleared!');
  };

  // Simple calendar (April 2025)
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const bookedDates = bookings.map((b) => parseInt(b.date.split('-')[2]));

  // Check authentication
  if (mockUser.role !== 'customer') {
    navigate('/signup');
    return null;
  }

  return (
    <div className="bg-white py-8 sm:py-16 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-8 sm:mb-12">
          Welcome to Your <span className="text-orange-600">Chef Sy</span> Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Profile Section */}
          <div className="bg-gray-50 rounded-2xl shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 mr-2" />
              Profile
            </h2>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              {/* Avatar */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700">Avatar</label>
                <div className="flex items-center space-x-4 mt-1">
                  <img
                    src={profile.avatar || 'https://via.placeholder.com/80'}
                    alt="Avatar"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="text-sm sm:text-base text-gray-600"
                  />
                </div>
                {errors.avatar && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.avatar}</p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm sm:text-base font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleProfileChange}
                  className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm sm:text-base font-medium text-gray-700">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm sm:text-base font-medium text-gray-700">
                  Address (Optional)
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={profile.address}
                  onChange={handleProfileChange}
                  className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                  placeholder="Enter your address"
                  rows="3"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-green-600 transition-colors duration-300 text-sm sm:text-base"
              >
                Save Profile
              </button>
              {errors.submit && (
                <p className="text-red-500 text-xs sm:text-sm text-center">{errors.submit}</p>
              )}
            </form>
          </div>

          {/* Bookings and Calendar Section */}
          <div className="md:col-span-2 space-y-4 sm:space-y-6">
            {/* Bookings */}
            <div className="bg-gray-50 rounded-2xl shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <BookmarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 mr-2" />
                Your Bookings
              </h2>
              <NavLink to="/booking">
                <button className="mb-4 bg-orange-500 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-orange-600 transition-colors duration-300 text-sm sm:text-base">
                  Make a New Booking
                </button>
              </NavLink>
              {bookings.length === 0 ? (
                <p className="text-gray-600 text-sm sm:text-base">No bookings yet.</p>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white p-4 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center"
                    >
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                          Chef {booking.chef}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                          {booking.date} at {booking.time}
                        </p>
                        <p className="text-gray-600 text-sm sm:text-base">{booking.location}</p>
                        <p
                          className={`text-sm sm:text-base ${
                            booking.status === 'Confirmed' ? 'text-green-500' : 'text-yellow-500'
                          }`}
                        >
                          Status: {booking.status}
                        </p>
                      </div>
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="mt-2 sm:mt-0 text-red-500 hover:underline text-sm sm:text-base"
                      >
                        Cancel
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Calendar */}
            <div className="bg-gray-50 rounded-2xl shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 mr-2" />
                Booking Calendar (April 2025)
              </h2>
              <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-xs sm:text-sm font-medium text-gray-700">
                    {day}
                  </div>
                ))}
                {Array(6).fill(null).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {calendarDays.map((day) => (
                  <div
                    key={day}
                    className={`p-1 sm:p-2 rounded-full text-xs sm:text-sm ${
                      bookedDates.includes(day)
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Settings */}
          <div className="bg-gray-50 rounded-2xl shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <CogIcon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 mr-2" />
              Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700">
                  Dietary Preferences
                </label>
                <textarea
                  className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                  placeholder="E.g., Vegetarian, Gluten-Free"
                  rows="3"
                />
              </div>
              <button
                onClick={() => alert('Settings saved!')}
                className="w-full bg-green-500 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-green-600 transition-colors duration-300 text-sm sm:text-base"
              >
                Save Settings
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-gray-50 rounded-2xl shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BellIcon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 mr-2" />
              Notifications
            </h2>
            {notifications.length === 0 ? (
              <p className="text-gray-600 text-sm sm:text-base">No notifications.</p>
            ) : (
              <div className="space-y-2">
                {notifications.map((notif) => (
                  <div key={notif.id} className="bg-white p-3 rounded-xl shadow-sm">
                    <p className="text-gray-800 text-sm sm:text-base">{notif.message}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{notif.date}</p>
                  </div>
                ))}
                <button
                  onClick={clearNotifications}
                  className="mt-4 text-red-500 hover:underline text-sm sm:text-base"
                >
                  Clear All Notifications
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
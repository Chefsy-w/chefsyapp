import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import { UserIcon, CalendarIcon, BookmarkIcon, CogIcon, BellIcon, PhotoIcon } from '@heroicons/react/24/solid';

const ChefDashboard = () => {
  // Profile state
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    specialty: '',
    bio: '',
    avatar: null,
  });

  // Bookings state
  const [bookings, setBookings] = useState([]);

  // Notifications state
  const [notifications, setNotifications] = useState([]);

  // Gallery state
  const [gallery, setGallery] = useState([]);

  const [avatarFile, setAvatarFile] = useState(null);
  const [errors, setErrors] = useState({});

  // Load data from localStorage on mount
  useEffect(() => {
    // Load profile
    const savedProfile = localStorage.getItem('chefSyChefProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      setProfile({
        fullName: 'Simon Simons',
        email: 'chef.simon@example.com',
        phone: '',
        address: '',
        specialty: 'Local and Continental Dishes',
        bio: 'Passionate about creating unique culinary experiences.',
        avatar: null,
      });
    }

    // Load bookings
    const savedBookings = localStorage.getItem('chefSyChefBookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      setBookings([
        {
          id: 1,
          customer: 'John Doe',
          date: '2025-05-10',
          time: '18:00',
          location: '123 Main St',
          status: 'Confirmed',
        },
        {
          id: 2,
          customer: 'Jane Smith',
          date: '2025-06-15',
          time: '19:30',
          location: '456 Oak Ave',
          status: 'Pending',
        },
      ]);
    }

    // Load notifications
    const savedNotifications = localStorage.getItem('chefSyChefNotifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    } else {
      setNotifications([
        { id: 1, message: 'New booking request from John Doe!', date: '2025-04-20' },
        { id: 2, message: 'Booking confirmed for May 10', date: '2025-04-22' },
      ]);
    }

    // Load gallery
    const savedGallery = localStorage.getItem('chefSyChefGallery');
    if (savedGallery) {
      setGallery(JSON.parse(savedGallery));
    }
  }, []);

  // Save profile to localStorage
  useEffect(() => {
    localStorage.setItem('chefSyChefProfile', JSON.stringify(profile));
  }, [profile]);

  // Save bookings to localStorage
  useEffect(() => {
    localStorage.setItem('chefSyChefBookings', JSON.stringify(bookings));
  }, [bookings]);

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem('chefSyChefNotifications', JSON.stringify(notifications));
  }, [notifications]);

  // Save gallery to localStorage
  useEffect(() => {
    localStorage.setItem('chefSyChefGallery', JSON.stringify(gallery));
  }, [gallery]);

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

  // Handle gallery upload
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const newImages = [];

    files.forEach((file) => {
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, gallery: 'Only JPG, PNG, or GIF files are allowed' }));
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, gallery: 'Each image must be under 2MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push({
          id: Date.now() + Math.random(), // Unique ID
          url: reader.result,
          name: file.name,
        });
        if (newImages.length === files.length) {
          setGallery((prev) => [...prev, ...newImages]);
          setErrors((prev) => ({ ...prev, gallery: null }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle gallery image deletion
  const handleDeleteImage = (id) => {
    setGallery((prev) => prev.filter((image) => image.id !== id));
    alert('Image deleted!');
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
    if (!profile.specialty.trim()) newErrors.specialty = 'Specialty is required';
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

  // Accept booking
  const acceptBooking = (id) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: 'Confirmed' } : booking
      )
    );
    setNotifications((prev) => [
      ...prev,
      {
        id: Date.now(),
        message: `Booking #${id} accepted`,
        date: new Date().toISOString().split('T')[0],
      },
    ]);
    alert('Booking accepted!');
  };

  // Clear notifications
  const clearNotifications = () => {
    setNotifications([]);
    alert('Notifications cleared!');
  };

  // Simple calendar (April 2025)
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const bookedDates = bookings.map((b) => parseInt(b.date.split('-')[2]));

  return (
    <div className="bg-white py-16 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <h1 className="text-center text-3xl sm:text-4xl font-bold text-gray-800 mb-12">
          Welcome to Your <span className="text-orange-600">Chef Sy</span> Chef Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="bg-gray-50 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <UserIcon className="w-6 h-6 text-orange-600 mr-2" />
              Chef Profile
            </h2>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              {/* Avatar */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Avatar</label>
                <div className="flex items-center space-x-4 mt-1">
                  <img
                    src={profile.avatar || 'https://via.placeholder.com/80'}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="text-sm text-gray-600"
                  />
                </div>
                {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>}
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleProfileChange}
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
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address (Optional)
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={profile.address}
                  onChange={handleProfileChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your address"
                  rows="3"
                />
              </div>

              {/* Specialty */}
              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
                  Specialty
                </label>
                <input
                  type="text"
                  id="specialty"
                  name="specialty"
                  value={profile.specialty}
                  onChange={handleProfileChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500"
                  placeholder="E.g., Local and Continental Dishes"
                />
                {errors.specialty && <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>}
              </div>

              {/* Bio */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio (Optional)
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleProfileChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Tell us about yourself"
                  rows="4"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-green-600 transition-colors duration-300"
              >
                Save Profile
              </button>
              {errors.submit && <p className="text-red-500 text-sm text-center">{errors.submit}</p>}
            </form>
          </div>

          {/* Bookings and Calendar Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bookings */}
            <div className="bg-gray-50 rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <BookmarkIcon className="w-6 h-6 text-orange-600 mr-2" />
                  Your Bookings
                </h2>
                <NavLink
                  to="/booking"
                  className="text-orange-600 hover:underline text-sm font-semibold"
                >
                  Manage Bookings
                </NavLink>
              </div>
              {bookings.length === 0 ? (
                <p className="text-gray-600">No bookings yet.</p>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {booking.customer}
                        </h3>
                        <p className="text-gray-600">
                          {booking.date} at {booking.time}
                        </p>
                        <p className="text-gray-600">{booking.location}</p>
                        <p
                          className={`text-sm ${
                            booking.status === 'Confirmed'
                              ? 'text-green-500'
                              : 'text-yellow-500'
                          }`}
                        >
                          Status: {booking.status}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {booking.status === 'Pending' && (
                          <button
                            onClick={() => acceptBooking(booking.id)}
                            className="text-green-500 hover:underline"
                          >
                            Accept
                          </button>
                        )}
                        <button
                          onClick={() => alert('Decline booking not implemented yet')}
                          className="text-red-500 hover:underline"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Calendar */}
            <div className="bg-gray-50 rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <CalendarIcon className="w-6 h-6 text-orange-600 mr-2" />
                Booking Calendar (April 2025)
              </h2>
              <div className="grid grid-cols-7 gap-2 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-sm font-medium text-gray-700">
                    {day}
                  </div>
                ))}
                {Array(6).fill(null).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {calendarDays.map((day) => (
                  <div
                    key={day}
                    className={`p-2 rounded-full ${
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
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Availability Settings */}
          <div className="bg-gray-50 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <CogIcon className="w-6 h-6 text-orange-600 mr-2" />
              Availability
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Available Days
                </label>
                <textarea
                  className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500"
                  placeholder="E.g., Monday - Friday, 9 AM - 5 PM"
                  rows="3"
                />
              </div>
              <button
                onClick={() => alert('Availability saved!')}
                className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-green-600 transition-colors duration-300"
              >
                Save Availability
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-gray-50 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BellIcon className="w-6 h-6 text-orange-600 mr-2" />
              Notifications
            </h2>
            {notifications.length === 0 ? (
              <p className="text-gray-600">No notifications.</p>
            ) : (
              <div className="space-y-2">
                {notifications.map((notif) => (
                  <div key={notif.id} className="bg-white p-3 rounded-xl shadow-sm">
                    <p className="text-gray-800">{notif.message}</p>
                    <p className="text-sm text-gray-500">{notif.date}</p>
                  </div>
                ))}
                <button
                  onClick={clearNotifications}
                  className="mt-4 text-red-500 hover:underline"
                >
                  Clear All Notifications
                </button>
              </div>
            )}
          </div>

          {/* Gallery Section */}
          <div className="bg-gray-50 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <PhotoIcon className="w-6 h-6 text-orange-600 mr-2" />
              Food Gallery
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Food Samples
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  multiple
                  onChange={handleGalleryUpload}
                  className="mt-1 text-sm text-gray-600"
                />
                {errors.gallery && <p className="text-red-500 text-sm mt-1">{errors.gallery}</p>}
              </div>
              {gallery.length === 0 ? (
                <p className="text-gray-600">No images uploaded yet.</p>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {gallery.map((image) => (
                    <div key={image.id} className="relative">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-32 object-cover rounded-xl"
                      />
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;
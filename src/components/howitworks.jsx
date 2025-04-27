import React from 'react';
import { NavLink } from 'react-router';

const HowItWorks = () => {
  return (
    <div className="py-8 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="bg-orange-100 rounded-full h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl sm:text-2xl font-bold text-orange-600">1</span>
            </div>
  <h3 className="text-lg sm:text-xl font-semibold text-orange-600 mb-4">
              Find a Chef
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Browse our talented chefs by location, cuisine, or specialty to find the perfect match
              for your event.
            </p>
            <NavLink
              to="/all-chefs"
              className="text-black font-semibold hover:underline text-sm sm:text-base"
            >
              Explore Chefs
            </NavLink>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 rounded-full h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl sm:text-2xl font-bold text-orange-600">2</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-orange-600 mb-4">
              Customize Your Menu
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Collaborate with your chosen chef to create a personalized menu tailored to your
              preferences and dietary needs.
            </p>
            <NavLink
              to="/book-chef"
              className="text-black font-semibold hover:underline text-sm sm:text-base"
            >
              Start Planning
            </NavLink>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 rounded-full h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl sm:text-2xl font-bold text-orange-600">3</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-orange-600 mb-4">
              Enjoy the Experience
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Relax as your chef prepares, serves, and cleans up, delivering a memorable dining
              experience in your home.
            </p>
            <NavLink
              to="/book-chef"
              className="text-black font-semibold hover:underline text-sm sm:text-base"
            >
              Book Now
            </NavLink>
          </div>
        </div>
        <div className="text-center mt-8 sm:mt-12">
          <NavLink
            to="/register"
            className="inline-block bg-black text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-orange-600 transition text-sm sm:text-base"
          >
            Get Started
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
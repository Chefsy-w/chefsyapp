import React from 'react';
import { NavLink } from 'react-router';
import aboutImage from '../assets/images/about.jpg';

const AboutUs = () => {
  return (
    <section className="py-8 sm:py-16 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
          About Chef Sy
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
          <div className="sm:w-1/2">
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              At Chef Sy, we believe dining is more than just a meal—it's an experience. Our mission
              is to connect you with exceptional private chefs who craft personalized,
              restaurant-quality meals in the comfort of your home.
            </p>
            <ul className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-sm sm:text-base text-gray-600">
                  <strong className="text-orange-600">Curated Chefs:</strong> Work with top-tier
                  chefs handpicked for their skill and creativity.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-sm sm:text-base text-gray-600">
                  <strong className="text-orange-600">Personalized Experiences:</strong> Tailor every
                  detail, from menu to ambiance, to suit your preferences.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-sm sm:text-base text-gray-600">
                  <strong className="text-orange-600">Seamless Service:</strong> Enjoy hassle-free
                  booking and a stress-free dining experience.
                </span>
              </li>
            </ul>
            <NavLink
              to="/book-chef"
              className="inline-block bg-black text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-orange-600 transition"
            >
              Book a Chef
            </NavLink>
          </div>
          <div className="sm:w-1/2 mt-6 sm:mt-0">
            <img
              src={aboutImage}
              alt="About Chef Sy"
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
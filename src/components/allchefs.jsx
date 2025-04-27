import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { StarIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const Chefs = () => {
  const [filters, setFilters] = useState({
    search: '',
    specialty: '',
    rating: '',
  });

  const chefs = [
    {
      id: 1,
      name: 'Simon Simons',
      specialty: 'Local and Continental Dishes',
    //   image: chf2,
      alt: 'Chef Simon Simons cooking',
      stars: 4,
    },
    {
      id: 2,
      name: 'Ewurabena Smith-Arthur',
      specialty: 'Sommelier and Continental Dishes',
    //   image: somelier1,
      alt: 'Chef Ewurabena Smith-Arthur preparing a dish',
      stars: 3,
    },
    {
      id: 3,
      name: 'Araba Forson',
      specialty: 'Local and Continental Dishes',
    //   image: chf4,
      alt: 'Chef Araba Forson teaching culinary arts',
      stars: 3,
    },
    {
      id: 4,
      name: 'Fel Gifty Opare',
      specialty: 'Pastry Chef',
    //   image: pastry2,
      alt: 'Chef Fel Gifty Opare baking pastries',
      stars: 4,
    },
  ];

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Filter chefs
  const filteredChefs = chefs.filter((chef) => {
    const matchesSearch = chef.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesSpecialty = filters.specialty
      ? chef.specialty === filters.specialty
      : true;
    const matchesRating = filters.rating
      ? chef.stars >= parseInt(filters.rating)
      : true;
    return matchesSearch && matchesSpecialty && matchesRating;
  });

  const specialties = [
    ...new Set(chefs.map((chef) => chef.specialty)),
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  const CardComponent = motion ? motion.article : 'article';

  return (
    <section className="bg-white py-8 sm:py-16 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-8 sm:mb-12">
          Find Your <span className="text-orange-600">Perfect Chef</span>
        </h1>

        {/* Filters */}
        <div className="mb-6 sm:mb-8 bg-gray-50 p-4 sm:p-6 rounded-2xl shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Search by Name */}
            <div>
              <label htmlFor="search" className="block text-sm sm:text-base font-medium text-gray-700">
                Search by Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                  placeholder="Enter chef name"
                />
                <MagnifyingGlassIcon className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
            </div>

            {/* Filter by Specialty */}
            <div>
              <label htmlFor="specialty" className="block text-sm sm:text-base font-medium text-gray-700">
                Specialty
              </label>
              <select
                id="specialty"
                name="specialty"
                value={filters.specialty}
                onChange={handleFilterChange}
                className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
              >
                <option value="">All Specialties</option>
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Rating */}
            <div>
              <label htmlFor="rating" className="block text-sm sm:text-base font-medium text-gray-700">
                Minimum Rating
              </label>
              <select
                id="rating"
                name="rating"
                value={filters.rating}
                onChange={handleFilterChange}
                className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
              >
                <option value="">All Ratings</option>
                <option value="3">3 Stars & Up</option>
                <option value="4">4 Stars & Up</option>
              </select>
            </div>
          </div>
        </div>

        {/* Chef List */}
        {filteredChefs.length === 0 ? (
          <p className="text-center text-gray-600 text-sm sm:text-base">No chefs match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredChefs.map((chef, index) => (
              <CardComponent
                key={chef.id}
                custom={index}
                initial={motion ? 'hidden' : undefined}
                animate={motion ? 'visible' : undefined}
                variants={motion ? cardVariants : undefined}
                className="bg-gray-50 rounded-2xl shadow-md p-4 sm:p-6 hover:shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={chef.image}
                  alt={chef.alt}
                  className="w-full h-48 sm:h-64 object-cover rounded-xl mb-4"
                />
                <div className="flex flex-row gap-1 mb-3">
                  {Array.from({ length: chef.stars }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <h2 className="text-base sm:text-lg font-semibold text-orange-600 mb-2">
                  Chef {chef.name}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">{chef.specialty}</p>
                <NavLink to="/booking">
                  <button className="mt-3 sm:mt-4 w-full bg-green-500 text-white font-semibold py-2 sm:py-3 px-4 rounded-full hover:bg-green-600 transition-colors duration-300 text-sm sm:text-base">
                    Book Now
                  </button>
                </NavLink>
              </CardComponent>
            ))}
          </div>
        )}

        {/* Sign Up Prompt */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
            Not a member yet? Join to book your chef!
          </p>
          <NavLink to="/signup">
            <button className="bg-orange-500 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-orange-600 transition-colors duration-300 text-sm sm:text-base">
              Sign Up
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Chefs;
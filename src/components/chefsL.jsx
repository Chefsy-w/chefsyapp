import React from 'react';
import { NavLink } from 'react-router';
import { StarIcon } from '@heroicons/react/24/solid';

const Landchef = () => {
  const chefs = [
    {
      id: 1,
      name: 'Simon Simons',
      specialty: 'Local and Continental Dishes',
      image: 'https://via.placeholder.com/300',
      alt: 'Chef Simon Simons cooking',
      stars: 4,
    },
    {
      id: 2,
      name: 'Ewurabena Smith-Arthur',
      specialty: 'Sommelier and Continental Dishes',
      image: 'https://via.placeholder.com/300',
      alt: 'Chef Ewurabena Smith-Arthur preparing a dish',
      stars: 3,
    },
    {
      id: 3,
      name: 'Araba Forson',
      specialty: 'Local and Continental Dishes',
      image: 'https://via.placeholder.com/300',
      alt: 'Chef Araba Forson teaching culinary arts',
      stars: 3,
    },
    {
      id: 4,
      name: 'Fel Gifty Opare',
      specialty: 'Pastry Chef',
      image: 'https://via.placeholder.com/300',
      alt: 'Chef Fel Gifty Opare baking pastries',
      stars: 4,
    },
  ];

  return (
    <section className="bg-white py-8 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-8 sm:mb-12">
          Meet Our <span className="text-orange-600">Talented Chefs</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {chefs.map((chef) => (
            <article
              key={chef.id}
              className="bg-gray-50 rounded-2xl shadow-md p-4 hover:shadow-lg hover:scale-105 transition-transform duration-300"
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
              <p className="text-sm sm:text-base text-gray-600">{chef.specialty}</p>
            </article>
          ))}
        </div>

        <div className="flex justify-center mt-8 sm:mt-12">
          <NavLink to="/all-chefs">
            <button className="bg-black text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-orange-600 transition-colors duration-300 text-sm sm:text-base">
              View More Chefs
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Landchef;
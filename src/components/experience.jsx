import React from 'react';
import { NavLink } from 'react-router';

const EnjoyExperience = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah M.',
      quote:
        'Chef Sy transformed our anniversary dinner into a magical evening. The food was incredible, and we didn’t lift a finger!',
    },
    {
      id: 2,
      name: 'James L.',
      quote:
        'The chef handled everything, from cooking to cleanup. It was like dining at a Michelin-star restaurant at home!',
    },
  ];

  return (
    <div className="py-8 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
          Enjoy the Experience
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="sm:w-1/2">
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Sit back and savor a gourmet dining experience crafted just for you. Our private chefs
              handle every detail—cooking, serving, and cleaning up—so you can focus on making
              memories with your guests.
            </p>
            <NavLink
              to="/book-chef"
              className="inline-block bg-black text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-orange-600 transition"
            >
              Book Now
            </NavLink>
          </div>
          <div className="sm:w-1/2 mt-6 sm:mt-0">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Enjoy the Experience"
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md"
            >
              <p className="text-sm sm:text-base text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <p className="text-sm sm:text-base text-gray-800 font-semibold">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnjoyExperience;
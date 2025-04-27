import React from 'react';
import { NavLink } from "react-router";
// import experienceImage from '../assets/experience-image.jpg';

const EnjoyExperience = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah M.',
      quote: 'Chef Sy transformed our anniversary dinner into a magical evening. The food was incredible, and we didn’t lift a finger!',
    },
    {
      id: 2,
      name: 'James L.',
      quote: 'The chef handled everything, from cooking to cleanup. It was like dining at a Michelin-star restaurant at home!',
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Enjoy the Experience
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="md:w-1/2">
            <p className="text-gray-600 mb-6">
              Sit back and savor a gourmet dining experience crafted just for you. Our private chefs handle every detail—cooking, serving, and cleaning up—so you can focus on making memories with your guests.
            </p>
            <NavLink
              to="/book-chef"
              className="inline-block bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition"
            >
              Book Now
            </NavLink>
          </div>
          <div className="md:w-1/2">
            <img
            //   src={experienceImage}
              alt="Enjoy the Experience"
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-100 p-6 rounded-lg shadow-md"
            >
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <p className="text-gray-800 font-semibold">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnjoyExperience;
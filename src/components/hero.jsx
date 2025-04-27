import React from 'react';
import herobg from '../assets/images/bg.jpg';

const Hero = () => {
  return (
    <div
      className="bg-fixed h-96 sm:h-128 md:h-160 bg-cover bg-center flex flex-col justify-center items-center text-center px-4 sm:px-6"
      style={{ backgroundImage: `url(${herobg})` }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-600 mb-4">
        The perfect private chefs near you
      </h1>
      <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-white">
        Find the one
      </p>
    </div>
  );
};

export default Hero;
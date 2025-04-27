import React from "react";
import herobg from "../assets/images/bg.jpg";

const Hero = () => {
    return (
   <div
        className=" bg-fixed h-160 bg-cover bg-center flex flex-col justify-center items-center text-center px-4 "
        style={{ backgroundImage: `url(${herobg})` }}
      >
        <h1 className="text-5xl font-bold text-orange-600 ">
          The perfect private chefs near you 
        </h1>
        <p className="text-5xl font-bold text-m">
        Find the one
        </p>
      </div>
  
    )
  }
  
  export default Hero
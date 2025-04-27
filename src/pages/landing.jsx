import React from "react";
import Hero from "../components/hero.jsx";
// import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import HOWITWORKS from "../components/howitworks.jsx";
import AboutUs from "../components/aboutus.jsx";
import EnjoyExperience from "../components/experience.jsx";
import Landchef from "../components/chefsL.jsx";

const Landing = () => {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        {/* <Navbar /> */}
        {/* Hero Section */}
        <Hero />
        {/* AboutUs */}
        <AboutUs />
        {/* HOWITWORKS */}
        <HOWITWORKS />
        {/* Landchef */}
        <Landchef />
        {/* EnjoyExperience */}
        <EnjoyExperience />
        {/* Footer */}
        <Footer />
      </div>
    );
  };
  
  export default Landing;
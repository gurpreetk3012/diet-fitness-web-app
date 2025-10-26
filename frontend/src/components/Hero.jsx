import React from "react";
import heroImage from "../assets/hero.jpg";

const Hero = () => {
  return (
    <div className="relative h-[90vh] flex items-center justify-center text-center">
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Fitness Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Your Personalized Path to a{" "}
          <span className="text-green-200">Healthier You</span>
        </h1>
        <p className="mb-6 text-base md:text-lg">
          Transform your body and mind with personalized workout plans,
          nutrition guidance, and progress tracking.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button className="px-6 py-3 bg-green-500 rounded text-white font-semibold hover:bg-green-600 transition">
            Start Your Journey
          </button>
          <button className="px-6 py-3 border border-white rounded hover:bg-white hover:text-green-500 transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

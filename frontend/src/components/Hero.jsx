import React from "react";
import heroImage from "../assets/hero.jpg";

const Hero = () => {
  return (
    <div className="relative h-[90vh] flex items-center justify-center text-center">
      {/* Background with Gradient and low-opacity image */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ background: 'linear-gradient(120deg, #43cea2, #185a9d)' }}  // <-- gradient from your code
      >
        <div className="absolute inset-0 opacity-10">
          <img 
            src={heroImage} 
            alt="Fitness motivation" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Your Personalized Path to a<br />
          <span className="text-green-200">Healthier You</span>
        </h1>
        <p className="mb-6 text-base md:text-lg">
          Transform your body and mind with personalized workout plans,
          nutrition guidance, and progress tracking.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            className="px-8 py-2 font-bold rounded-xl focus:outline-none transition-transform duration-500 ease-in-out transform flex items-center text-lg hover:scale-105"
            style={{
              background: 'linear-gradient(to right, #22c670, #20ddd8)'
            }}
          >
            Start Your Journey
            <span className="ml-4">&rarr;</span>
          </button>
          <button className="bg-white/10 border border-white/30 text-white hover:bg-white/20 backdrop-blur-sm px-8 py-2 rounded-xl font-semibold transition text-lg">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

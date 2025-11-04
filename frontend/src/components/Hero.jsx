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
      <div className="relative z-10 max-w-1xl mx-auto text-white text-center -translate-y-6 md:-translate-y-10">
        <h1 className="font-extrabold tracking-tight leading-tight">
          <span className="block text-4xl md:text-6xl lg:text-7xl font-bold">
            Your Personalized Path
          </span>
          <span className="block text-3xl md:text-6xl lg:text-6xl font-bold mt-1">
            to a{" "}
            <span className="bg-gradient-to-r from-secondary via-accent to-blue-300 bg-clip-text text-transparent">
              Healthier You
            </span>
          </span>
        </h1>
        <p className="mt-12 text-lg md:text-2xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
          Transform your body and mind with personalized workout plans, nutrition
          guidance, and progress tracking.
        </p>
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            className="px-7 md:px-8 py-3 rounded-xl font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-[1.02] focus:outline-none"
            style={{
              background: 'linear-gradient(to right, #22c670, #20ddd8)',
            }}
          >
            Start Your Journey <span className="ml-2">→</span>
          </button>

          <button className="px-7 md:px-8 py-3 rounded-xl font-semibold text-white bg-white/10 border border-white/30 hover:bg-white/20 backdrop-blur-sm transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

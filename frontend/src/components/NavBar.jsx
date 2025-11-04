import React from "react";
import logo from "../assets/logo.png";

function Navbar({ onHomeClick, onLoginClick, onDashboardClick, onLogout, isLoggedIn }) {
  return (
    <nav className="flex justify-between items-center px-14 py-4 bg-[#f6fbfb] text-green-500 transition-shadow duration-300">
      <div
        className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-200"
        onClick={onHomeClick}
      >
        <img
          src={logo}
          alt="PrediFit Logo"
          className="w-11 h-11 object-contain"
        />
        <h1 className="text-2xl font-bold text-green-600">PrediFit</h1>
      </div>
      <div className="flex gap-4">
        {!isLoggedIn ? (
          <>
            <button
              onClick={onHomeClick}
              className="bg-white border text-green-900 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#30e8ba]/90 hover:text-white transition-colors transition-transform transition-shadow duration-500 hover:scale-[1.05]  focus:outline-none"
            >
              Sign Up
            </button>
            <button
              onClick={onLoginClick}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-colors transition-transform transition-shadow duration-500 hover:scale-[1.05] focus:outline-none"
              style={{
                background: 'linear-gradient(to right, #22c670, #20ddd8)'
              }}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onDashboardClick}
              className="bg-white text-green-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors transition-transform transition-shadow duration-500 hover:scale-[1.05] focus:outline-none"
            >
              Home
            </button>
            <button
              onClick={onLogout}
              className="bg-white text-green-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors transition-transform transition-shadow duration-500 hover:scale-[1.05] focus:outline-none"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

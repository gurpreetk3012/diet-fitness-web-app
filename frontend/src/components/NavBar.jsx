import React from "react";

function Navbar({ onHomeClick, onLoginClick, onDashboardClick, onLogout, isLoggedIn }) {
  return (
    <nav className="flex justify-between items-center px-14 py-4 bg-[#f6fbfb] text-green-500 shadow-md">
      <h1
        className="text-2xl font-bold cursor-pointer hover:scale-105 transition-transform duration-200"
        onClick={onHomeClick}
      >
        PrediFit
      </h1>

      <div className="flex gap-4">
        {!isLoggedIn ? (
          <>
            <button
              onClick={onHomeClick}
              className="bg-white border text-green-900 px-4 py-2 rounded-xl font-semibold hover:bg-[#30e8ba]/90 hover:text-white transition-colors"
            >
              Sign Up
            </button>
            <button
              onClick={onLoginClick}
              className="px-4 py-2 rounded-xl font-semibold text-white transition-colors"
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
              className="bg-white text-green-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Home
            </button>
            <button
              onClick={onLogout}
              className="bg-white text-green-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
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

import React from "react";

function Navbar({ onHomeClick, onLoginClick, onDashboardClick, onLogout, isLoggedIn }) {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-green-400 to-emerald-600 text-white shadow-md">
      <h1
        className="text-2xl font-bold cursor-pointer hover:scale-105 transition-transform duration-200"
        onClick={onHomeClick}
      >
        FitLoop
      </h1>

      <div className="flex gap-4">
        {!isLoggedIn ? (
          <>
            <button
              onClick={onHomeClick}
              className="bg-white text-green-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Home
            </button>
            <button
              onClick={onLoginClick}
              className="bg-white text-green-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
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
              Dashboard
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

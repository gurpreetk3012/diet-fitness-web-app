import React, { useEffect, useState } from "react";

const DashboardPage = ({ user, onLogout, onEditProfile }) => {
  const [metrics, setMetrics] = useState({ bmi: "--", bmr: "--" });

  useEffect(() => {
    if(user && user.email){
      fetch(`http://127.0.0.1:5000/bmi_bmr/dashboard?email=${user.email}`)
      .then(res => res.json())
      .then(data => setMetrics({ bmi: data.bmi, bmr: data.bmr }))
      .catch(() => setMetrics({ bmi: "Error", bmr: "Error" }));
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <header className="bg-card shadow-sm">
        <div className="container mx-auto px-14 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">PrediFit Dashboard</h1>
          {/* Placeholder Logout Button */}
          <div className="flex space-x-4">
            <button
              className="flex items-center bg-transparent text-foreground font-semibold px-5 py-2 rounded-lg hover:bg-[#30e8ba]/90 hover:text-white transition-colors"
              title="Home"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 2 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z" />
              </svg>
              Home
            </button>
            <button
              onClick={onLogout}
              className="bg-transparent text-foreground font-semibold px-5 py-2 rounded-lg hover:bg-[#30e8ba]/90 hover:text-white transition-colors"
              title="Logout"
            >
              Logout
            </button>
          </div>
          </div>
          </header>

          <main className="container mx-auto px-14 py-8 space-y-8">
            {/* User Profile Overview */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6">
          {/* Placeholder Avatar */}
          <div className="h-20 w-20 flex items-center justify-center bg-primary/10 rounded-full">
            <span role="img" aria-label="User" className="text-4xl">👤</span>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Age: </span> <span className="font-semibold">{user.age}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Gender: </span>
                <span className="font-semibold capitalize">{user.gender}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Weight: </span>
                <span className="font-semibold">{user.weight} kg</span>
              </div>
              <div>
                <span className="text-muted-foreground">Height: </span>
                <span className="font-semibold">{user.height} cm</span>
              </div>
              <div>
                <span className="text-muted-foreground">Goal: </span>
                <span className="font-semibold capitalize">Maintenance</span>
              </div>
            </div>
          </div>
          {/* Edit Profile Button */}
          <button
            onClick={onEditProfile}
            className="flex items-center gap-2 px-5 py-2 rounded-xl border border-[#e2f2ea] text-[#003817] font-semibold bg-white hover:bg-[#30e8ba] transition-colors hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            Edit Profile
          </button>
        </div>

        {/* Fitness Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
            <div className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium">BMI</span>
              {/* Placeholder for Icon */}
            </div>
            <div className="text-2xl font-bold">{metrics.bmi}</div>
            <p className="text-xs text-muted-foreground">Body Mass Index</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
            <div className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium">BMR</span>
              {/* Placeholder for Icon */}
            </div>
            <div className="text-2xl font-bold">{metrics.bmr}</div>
            <p className="text-xs text-muted-foreground">Basal Metabolic Rate</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
            <div className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium">Daily Calories</span>
              {/* Placeholder for Icon */}
            </div>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">Recommended intake</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
            <div className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium">Today's Calories</span>
              {/* Placeholder for Icon */}
            </div>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">From meals logged</p>
          </div>
        </div>

        {/* Macros */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-semibold mb-4">Today's Macros</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">--g</p>
              <p className="text-sm text-muted-foreground">Protein</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-secondary">--g</p>
              <p className="text-sm text-muted-foreground">Carbs</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-accent">--g</p>
              <p className="text-sm text-muted-foreground">Fats</p>
            </div>
          </div>
        </div>

        {/* Meal Plan Snapshot */}
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="flex flex-row items-center justify-between mb-4">
            <h3 className="font-semibold">Today's Meals</h3>
            <button className="bg-[#30e8ba] text-white px-3 py-1 rounded flex items-center gap-1">
              {/* Icon Placeholder */}
              + Add Meal
            </button>
          </div>
          <p className="text-center text-muted-foreground py-8">No meals planned for today. Start logging your meals!</p>
        </div>

        {/* Feature Cards Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Discover PrediFit Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: BMI & BMR Calculator */}
            <div className="bg-white rounded-2xl shadow-lg p-0 overflow-hidden relative" style={{ background: "rgba(44,207,171,0.08)" }}>
              <div className="absolute top-6 left-6 bg-[#2ee59d]/90 p-3 rounded-xl">
                {/* Optional icon, can use SVG, Emoji, or Heroicons */}
                <span role="img" aria-label="calculator">🧮</span>
              </div>
              <div className="p-8 pt-20">
                <h3 className="font-bold text-lg mb-2">BMI & BMR Calculator</h3>
                <p className="text-gray-600 text-[15px]">
                  Calculate your Body Mass Index and Basal Metabolic Rate instantly to understand your body better.
                </p>
              </div>
            </div>
            {/* Card 2: Personalized Meal Plans */}
            <div className="bg-white rounded-2xl shadow-lg p-0 overflow-hidden relative" style={{ background: "rgba(44,207,171,0.12)" }}>
              <div className="absolute top-6 left-6 bg-[#2ee59d]/90 p-3 rounded-xl">
                <span role="img" aria-label="meal">🍽️</span>
              </div>
              <div className="p-8 pt-20">
                <h3 className="font-bold text-lg mb-2">Personalized Meal Plans</h3>
                <p className="text-gray-600 text-[15px]">
                  Get customized nutrition plans tailored to your goals, preferences, and dietary requirements.
                </p>
              </div>
            </div>
            {/* Card 3: Custom Workout Plans */}
            {/* <div className="bg-white rounded-2xl shadow-lg p-0 overflow-hidden relative" style={{ background: "rgba(44,207,171,0.08)" }}>
              <div className="absolute top-6 left-6 bg-[#2ee59d]/90 p-3 rounded-xl">
                <span role="img" aria-label="workout">🏋️‍♂️</span>
              </div>
              <div className="p-8 pt-20">
                <h3 className="font-bold text-lg mb-2">Custom Workout Plans</h3>
                <p className="text-gray-600 text-[15px]">
                  Access workout routines designed specifically for your fitness level and objectives.
                </p>
              </div>
            </div> */}
            {/* Card 4: Yoga & Mindfulness */}
            {/* <div className="bg-white rounded-2xl shadow-lg p-0 overflow-hidden relative mt-8 md:mt-0" style={{ background: "rgba(44,207,171,0.10)" }}>
              <div className="absolute top-6 left-6 bg-[#2ee59d]/90 p-3 rounded-xl">
                <span role="img" aria-label="yoga">🧘‍♂️</span>
              </div>
              <div className="p-8 pt-20">
                <h3 className="font-bold text-lg mb-2">Yoga & Mindfulness Plans</h3>
                <p className="text-gray-600 text-[15px]">
                  Discover personalized yoga routines and meditation practices for mental and physical balance.
                </p>
              </div>
            </div> */}
            {/* Card 5: Progress Tracker */}
            {/* <div className="bg-white rounded-2xl shadow-lg p-0 overflow-hidden relative mt-8 md:mt-0" style={{ background: "rgba(44,207,171,0.12)" }}>
              <div className="absolute top-6 left-6 bg-[#2ee59d]/90 p-3 rounded-xl">
                <span role="img" aria-label="tracker">📈</span>
              </div>
              <div className="p-8 pt-20">
                <h3 className="font-bold text-lg mb-2">Progress Tracker</h3>
                <p className="text-gray-600 text-[15px]">
                  Monitor your weight, workouts, and achievements with detailed tracking and analytics.
                </p>
              </div>
            </div> */}
            {/* Card 6: Daily Fitness Tips */}
            <div className="bg-white rounded-2xl shadow-lg p-0 overflow-hidden relative mt-8 md:mt-0" style={{ background: "rgba(44,207,171,0.09)" }}>
              <div className="absolute top-6 left-6 bg-[#2ee59d]/90 p-3 rounded-xl">
                <span role="img" aria-label="tips">💡</span>
              </div>
              <div className="p-8 pt-20">
                <h3 className="font-bold text-lg mb-2">Daily Fitness Tips</h3>
                <p className="text-gray-600 text-[15px]">
                  Get expert fitness tips and motivation delivered daily to keep you on track.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
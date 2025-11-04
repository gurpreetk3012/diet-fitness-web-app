// FitnessTipsPage.jsx
import React from "react";

const tips = [
  {
    title: "Workout Tips",
    description: "Expert advice on exercise form, routines, and maximizing your training effectiveness.",
    icon: (
      <span className="bg-green-100 p-3 rounded-xl">
        {/* Example icon: Dumbbell SVG */}
        <svg width="24" height="24" fill="none" stroke="#22c55e" strokeWidth="2">
          <rect x="2" y="10" width="4" height="4" />
          <rect x="18" y="10" width="4" height="4" />
          <rect x="7" y="11" width="10" height="2" />
        </svg>
      </span>
    ),
  },
  {
    title: "Nutrition Advice",
    description: "Daily nutrition tips to fuel your body and support your fitness goals.",
    icon: (
      <span className="bg-green-100 p-3 rounded-xl">
        {/* Example icon: Nutrition SVG */}
        <svg width="24" height="24" fill="none" stroke="#22c55e" strokeWidth="2">
          <circle cx="12" cy="12" r="8" />
          <rect x="10" y="7" width="4" height="10" />
        </svg>
      </span>
    ),
  },
  {
    title: "Recovery & Rest",
    description: "Learn the importance of rest days and proper recovery techniques.",
    icon: (
      <span className="bg-green-100 p-3 rounded-xl">
        {/* Example icon: Heart SVG */}
        <svg width="24" height="24" fill="none" stroke="#22c55e" strokeWidth="2">
          <path d="M12 21C12 21 4 13.64 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12 4.29 12 4.29C12 4.29 12.76 3 14.5 3C17.58 3 20 5.42 20 8.5C20 13.64 12 21 12 21Z"/>
        </svg>
      </span>
    ),
  },
  {
    title: "Sleep Optimization",
    description: "Discover how quality sleep impacts your fitness journey and performance.",
    icon: (
      <span className="bg-green-100 p-3 rounded-xl">
        {/* Example icon: Moon SVG */}
        <svg width="24" height="24" fill="none" stroke="#22c55e" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      </span>
    ),
  },
  {
    title: "Hydration Tips",
    description: "Stay properly hydrated with personalized water intake recommendations.",
    icon: (
      <span className="bg-green-100 p-3 rounded-xl">
        {/* Example icon: Water drop SVG */}
        <svg width="24" height="24" fill="none" stroke="#22c55e" strokeWidth="2">
          <path d="M12 21C7 16.5 5 13.33 5 10a7 7 0 1114 0c0 3.33-2 6.5-7 11z"/>
        </svg>
      </span>
    ),
  },
  {
    title: "Motivation & Mindset",
    description: "Daily inspiration and mental strategies to keep you motivated and focused.",
    icon: (
      <span className="bg-green-100 p-3 rounded-xl">
        {/* Example icon: Lightbulb SVG */}
        <svg width="24" height="24" fill="none" stroke="#22c55e" strokeWidth="2">
          <circle cx="12" cy="12" r="6"/>
          <path d="M12 18v3M9 21h6"/>
        </svg>
      </span>
    ),
  },
];

function FitnessTipsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-400 to-blue-600 p-10 text-white text-center">
        <h1 className="text-4xl font-bold mb-2">Daily Fitness Tips</h1>
        <p className="text-lg">Get expert fitness tips and motivation delivered daily. Small changes lead to big results.</p>
      </div>

      {/* Cards Section */}
      <div className="max-w-6xl mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {tips.map((tip) => (
          <div key={tip.title} className="bg-white rounded-xl border border-gray-200 shadow p-6 flex flex-col items-start gap-4 hover:shadow-lg transition-shadow">
            {tip.icon}
            <div>
              <h2 className="font-bold text-lg text-gray-800">{tip.title}</h2>
              <p className="text-gray-600 mt-1">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FitnessTipsPage;
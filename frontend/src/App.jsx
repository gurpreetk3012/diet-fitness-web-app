import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HealthyOptions from "./components/healthyOptions";
import IsLogin from "./components/isLogin";
import DashboardPage from "./components/Dashboardpage";
import EditProfile from "./components/EditProfile";

function App() {
  const [page, setPage] = useState("home"); // "home" | "login" | "dashboard"
  const [user, setUser] = useState(null);

  const handleAuthSuccess = (userInfo) => {
    setUser(userInfo);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("home");
  };

  const fetchProfile = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://127.0.0.1:5000/api/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
      const profile = await response.json();
      setUser(profile);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Render Navbar only if not on dashboard */}
      {page !== "dashboard" && (
        <Navbar
          onHomeClick={() => setPage("home")}
          onLoginClick={() => setPage("login")}
          onDashboardClick={() => setPage("dashboard")}
          onLogout={handleLogout}
          isLoggedIn={!!user}
        />
      )}

      {/* Animated page transitions */}
      <div>
        <AnimatePresence mode="wait">
          {!user && page === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              <HealthyOptions />
            </motion.div>
          )}

          {!user && page === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              <IsLogin onAuthSuccess={handleAuthSuccess} />
            </motion.div>
          )}

          {user && page === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              <DashboardPage user={user} onLogout={handleLogout} onEditProfile={() => setPage("edit-profile")} />
            </motion.div>
          )}

          {user && page === "edit-profile" && (
            <motion.div
              key="edit-profile"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              <EditProfile
                user={user}
                onClose={() => {
                  fetchProfile();
                  setPage("dashboard");
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
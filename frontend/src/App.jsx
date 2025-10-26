import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import IsLogin from "./components/isLogin";
import DashboardPage from "./components/Dashboardpage";

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar always visible */}
      <Navbar
        onHomeClick={() => setPage("home")}
        onLoginClick={() => setPage("login")}
        onDashboardClick={() => setPage("dashboard")}
        onLogout={handleLogout}
        isLoggedIn={!!user}
      />

      {/* Animated page transitions */}
      <div className="p-6">
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
              <DashboardPage user={user} onLogout={handleLogout} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import axios from "./config/api";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ChatApp from "./pages/ChatApp";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
  const [currentView, setCurrentView] = useState("landing");
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Cek Status Login saat Reload Halaman
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");

    if (token && userData) {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);

        // Check if user is admin
        const isAdmin = parsedUser.role === "admin";
        setCurrentView(isAdmin ? "admin" : "app");
      } catch (e) {
        console.error("Failed to parse user data:", e);
        localStorage.clear();
      }
    }

    setInitializing(false);
  }, []);

  const handleNavigate = (view) => setCurrentView(view);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    const isAdmin = userData.role === "admin";
    setCurrentView(isAdmin ? "admin" : "app");
  };

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
    } catch (e) {
      console.log("Logout error", e);
    }

    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    delete axios.defaults.headers.common["Authorization"];

    setUser(null);
    setCurrentView("landing");
  };

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat aplikasi...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentView === "landing" && <LandingPage onNavigate={handleNavigate} />}
      {currentView === "login" && (
        <AuthPage
          type="login"
          onAuthSuccess={handleAuthSuccess}
          onNavigate={handleNavigate}
        />
      )}
      {currentView === "register" && (
        <AuthPage
          type="register"
          onAuthSuccess={handleAuthSuccess}
          onNavigate={handleNavigate}
        />
      )}
      {currentView === "app" && user && (
        <ChatApp user={user} onLogout={handleLogout} />
      )}
      {currentView === "admin" && user && (
        <AdminPanel user={user} onLogout={handleLogout} />
      )}
    </>
  );
};

export default App;

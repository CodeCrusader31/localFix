

"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Create context
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest"); // Directly manage the role
  const [loading, setLoading] = useState(true);

  // Fetch latest user info from /api/me on initial load
  const fetchMe = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/me", {
        credentials: "include", // Important for sending the auth cookie
        cache: "no-store",
      });
      const data = await res.json();
      console.log("Response from /api/me:", { status: res.status, data });
      if (res.ok && data.user) {
        setUser(data.user);
        setRole(data.user.role || "guest");
      } else {
        // No user or an error occurred
        setUser(null);
        setRole("guest");
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setUser(null);
      setRole("guest");
    } finally {
      setLoading(false);
    }
  };

  // Run on first load to check session
  useEffect(() => {
    fetchMe();
  }, []);

  // Login function updates user and role
  const login = (userData) => {
    setUser(userData);
    setRole(userData.role || "guest");
    // The auth token is assumed to be handled by an httpOnly cookie now
  };

  // Logout function clears user and role
  const logout = async () => {
    try {
      // Tell backend to clear the httpOnly cookie
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Clear state regardless of API call success
      setUser(null);
      setRole("guest");
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        role, // Directly expose the role
        isAuthenticated: !!user, // Derived from user state
        loading,
        login,
        logout,
        fetchMe, // Expose fetchMe to manually refresh user state if needed
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to easily use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
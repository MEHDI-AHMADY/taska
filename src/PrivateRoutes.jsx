import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import pb from "./lib/pocketbase";
import { InfinitySpin } from "react-loader-spinner";

export default function PrivateRoutes({ children }) {
  const [authState, setAuthState] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
        checkAuth();
    }, 2000);
  }, []);

  const checkAuth = async () => {
    try {
      const user = await pb.authStore.get();

      if (user) {
        const firstTimeUser = await checkIfFirstTimeUser(user.id);
        setAuthState(firstTimeUser ? "register" : true);
      } else {
        setAuthState("login");
      }
    } catch (err) {
      console.error("Error checking authentication:", err);
      setAuthState(false);
    }
  };

  const checkIfFirstTimeUser = async (userId) => {
    try {
      const userRecord = await pb.collection("users").getOne(userId);
      return !userRecord.isRegistered;
    } catch (err) {
      console.error("Error checking first-time user status:", err);
      return false;
    }
  };

  if (authState === null) {
    return (
      <div className="h-full flex items-center justify-center">
        <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
      />
      </div>
    );
  }

  if (authState === true) {
    return children;
  }

  if (authState === "login") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Navigate to="/register" state={{ from: location }} replace />;
}

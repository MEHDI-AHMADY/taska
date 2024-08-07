import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import pb from "./lib/pocketbase";
import { RotatingLines } from "react-loader-spinner";

const checkAuth = async () => {
  try {
    const user = pb.authStore.isAuthRecord;
    if (user) {
      const isRegistered = await pb.collection("users").getOne(user.id).isRegistered;
      return { isAuthenticated: true , isRegistered};
    } else {
      return { isAuthenticated: false , isRegistered : false };
    }
  } catch (err) {
    console.error("Error checking authentication:", err);
    throw new Error("Authentication check failed");
  }
};

export default function PrivateRoutes({ children }) {
  const location = useLocation();

  const { data = {}, status } = useQuery({
    queryKey: ["authCheck"],
    queryFn: checkAuth,
  });

  if (status === "loading") {
    <div>
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>;
  }

  if (!data.isAuthenticated) {
    if (data.isRegistered) {
      return <Navigate to="/login" state={{ from: location }} replace={true} />;
    } else {
      return <Navigate to="/register" state={{ from: location }} replace={true} />;
    }
  }

  return children;
}

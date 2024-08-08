import React, {useEffect , useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RotatingLines } from "react-loader-spinner";

const checkAuth = async () => {
  
  const userId = localStorage.getItem('userId');
  return userId ? { isAuthenticated: true } : { isAuthenticated: false };
  
};

export default function PrivateRoutes({ children }) {
  const [showLoader , setShowLoader] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  } , []);

  const {
    data = {},
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["authCheck"],
    queryFn: checkAuth,
  });

  if (showLoader || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (!data.isAuthenticated) {
    return <Navigate to="/register" state={{ from : location }} replace/>;
  }

  return children;
}

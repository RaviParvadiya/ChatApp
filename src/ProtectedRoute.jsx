import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isLoggedIn =
    window.localStorage.getItem("token") == null ? true : false;
  console.log(isLoggedIn);

  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;

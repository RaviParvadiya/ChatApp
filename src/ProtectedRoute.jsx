import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

 const [key, setKey] = useState(window.localStorage.getItem("key"));

  const apiendpoint = "https://chat-bw04.onrender.com/";

  useEffect(() => {
    const getKey = async () => {
        const res = await axios.get(`${apiendpoint}login`)
        console.log(res.data.token);
        window.localStorage.setItem("key", res.data.token);
        setKey(res.data.token);
      };
      getKey();
  })

  const isLoggedIn = key == null ? true : false;
  console.log(isLoggedIn);

  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
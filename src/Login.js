import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import API from "./api/API";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a request to the server to verify the user's credentials
    try {
      const response = await API.post("login", {
        username,
        password,
      });
      console.log(response.data);
      // If the credentials are valid, set isLoggedIn to true
      window.localStorage.setItem("username", response.data.data.username);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Log in</button>
      </form>
      <Link to="/signup">
        <p>Don't have an account?</p>
      </Link>
    </div>
  );
};

export default Login;

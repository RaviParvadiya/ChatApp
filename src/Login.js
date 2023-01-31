import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import API from "./api/API";
import "./Styles/Login.css"


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
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="parent-div">
    
    
    <div className="login-box">
        <h2 className="head-login">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
        <label>
          Username
          <input
            className="cta-txt-home"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        </div>
        
        <div className="user-box">
        <label>
          Password
          <input
            className="cta-txt-home"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        </div>
        
        <button className="cta-login-btn" type="submit">Log in</button>
      </form>
      <Link to="/signup">
        <p>Don't have an account?</p>
      </Link>
    </div>
    {/* <div className="second-compo">
        Welcome to Chat Aréna
    </div> */}
    </div>
  );
};

export default Login;

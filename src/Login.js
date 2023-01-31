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
    
    <div className='parent-login'>
      <div className='form-main'>
      <form onSubmit={handleSubmit}>
        <div className='uname-div'>
        <label>
          Username
          <input
            className='cta-txt-home'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        </div>
        
        <div className='pass-div'>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        </div>
        <div className='submit-btn'>
        <button type="submit">Log in</button>
        </div>
        
      </form>
      </div>
      
      <Link className='signup-lnk' to="/signup">Don't have an account?</Link>
    </div>

  );
};

export default Login;

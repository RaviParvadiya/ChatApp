import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import API from "./api/API";
import LinkSwitcher from "./LinkSwitcher/LinkSwitcher";
import "./Styles/Login.css";
import logo from "./Res/login-auth.svg";

// framer Motion

// import "./Res/"

const { io } = require("socket.io-client");
const socket = io("http://192.168.29.18:5000/");

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token !== null) {
      socket.auth = { token: token };
      socket.connect();
    }
  });

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
      window.localStorage.setItem("token", response.data.data);

      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <LinkSwitcher>
      <div className="parent-div">
        <div className="img-back">
          <img alt="" className="img-login" src={logo}></img>
          <img alt="" className="img-login-back" src={logo}></img>

          {/* <img alt='background-img' src='./Res/login-img.png'></img> */}
        </div>

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

            <button className="cta-login-btn" type="submit">
              Log in
            </button>
          </form>
          {/* <div className="transition"></div> */}
          <Link className="cta" to="/signup">
            <p>Don't have an account?</p>
          </Link>
        </div>
        {/* <div className="second-compo">
        Welcome to Chat Aréna
    </div> */}
      </div>
    </LinkSwitcher>
  );
};

export default Login;

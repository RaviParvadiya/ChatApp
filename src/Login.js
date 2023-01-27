import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Socket } from "socket.io-client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the server to verify the user's credentials
    Socket.emit("", { email: email, password: password });
    // If the credentials are valid, set isLoggedIn to true
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

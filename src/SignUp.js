import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Socket } from "socket.io-client";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the server to create a new user
    Socket.emit("", { username: username, email: email, password: password });
    // If the signup is successful, set isSignedUp to true
    setIsSignedUp(true);
  };

  if (isSignedUp) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
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
        <button type="submit">Sign up</button>
      </form>
      <Link to="/login">
        <p>Already have an account?</p>
      </Link>
    </div>
  );
};

export default SignUp;

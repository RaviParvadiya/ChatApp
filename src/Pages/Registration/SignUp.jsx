import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import API from "../../api/API";
import LinkSwitcher from "../../Components/LinkSwitcher/LinkSwitcher";
import "../../Styles/SignUp.css"
import signup from "../../Res/wlcm-cat.svg"

// Framer Motion


const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to the server to create a new user
      const response = await API.post("register", {
        username,
        email,
        password,
      });
      console.log(response.data);
      // If the signup is successful, redirect the user to the home page
      setIsSignedUp(true);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  if (isSignedUp) {
    return <Navigate to="/login" />;
  }

  return (
    <LinkSwitcher>

    <div className="parent-div">


        <div className="img-back">
          <img alt='op' className="img-signup" src={signup}></img>
          <img alt='op1' className="img-signup-back" src={signup}></img>
          
        </div>


    <div className="parent-div-signup">
      <div className="signup-box">
      <h2 className="head-login">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
        <label>
          Username
          <input
            className="cta-txt-signup"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        </div>
        
        <div>
        <label>
          Email
          <input
            className="cta-txt-signup"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        </div>
        
        <div>
        <label>
          Password
          <input
            className="cta-txt-signup"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        </div>
        
        <button className="cta-signup-btn" type="submit">Sign up</button>
      </form>
      <Link to="/login">
        <p>Already have an account?</p>
      </Link>
      </div>
    </div>
    </div>

     </LinkSwitcher>
  );
};

export default SignUp;

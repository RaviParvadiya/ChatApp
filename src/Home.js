import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Home = () => {
  const token = Cookies.get('token');
  console.log(token);
  return (
    <div>
      <Link to="/create-room">
        <p>Create Room</p>
      </Link>
      <Link to="/join-room">
        <p>Join Room</p>
      </Link>
    </div>
  );
};

export default Home;

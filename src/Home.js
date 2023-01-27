import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
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

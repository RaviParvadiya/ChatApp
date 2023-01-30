import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import socketIOClient from "socket.io-client";

// const ENDPOINT = "https://chat-bw04.onrender.com/rooms";
// const socket = socketIOClient(ENDPOINT);

const { io } = require("socket.io-client");
const socket = io("https://chat-bw04.onrender.com/rooms");

const CreateRoom = () => {
  const [room, setRoom] = useState("");
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = window.localStorage.getItem("username");
    // Emit an event to the server to create the room
    socket.connect("connect", () =>{
    socket.emit("joinRoom", { username, room })});
  
    navigate("chat-room");
    setRoom("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Room Name:
        <input
          type="text"
          value={room}
          required
          onChange={(e) => setRoom(e.target.value)}
        />
      </label>
      <button type="submit">Create Room</button>
    </form>
  );
};

export default CreateRoom;

import Cookies from "js-cookie";
import React, { useState } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "https://chat-bw04.onrender.com/rooms";
const socket = socketIOClient(ENDPOINT);

const token = Cookies.get('token');
console.log(token);

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Emit an event to the server to create the room
    socket.emit("", { roomName });
    setRoomName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Room Name:
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </label>
      <button type="submit">Create Room</button>
    </form>
  );
};

export default CreateRoom;

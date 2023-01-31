import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const { io } = require("socket.io-client");
const socket = io("http://192.168.29.212:3000/");

const Home = () => {
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState('');
  const [selectedRoom, setSelectedRoom] = useState("");

  socket.on("connect", () => {
    console.log(socket.id);
  });

  // listen for room updates from the server
  socket.on("allRooms", (data) => {
    console.log(data[0].roomName);
    setRooms(data[0].roomName);
    console.log(rooms);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("", { roomName: selectedRoom });
  };

  const token = window.localStorage.getItem("token");

  const decoded = jwt_decode(token);
  // console.log(decoded);

  const createRoom = async (e) => {
    e.preventDefault();
    // Emit an event to the server to create the room
    socket.emit("joinRoom", decoded.username, room);
    // navigate("chat-room");
    setRoom("");
  };

  return (
    <div>
      <p>Create Room</p>
      <form onSubmit={createRoom}>
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
      <p>Join Room</p>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Select a Room:
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
            >
            </select>
          </label>
          <button type="submit">Join Room</button>
        </form>
      </div>
    </div>
  );
};

export default Home;

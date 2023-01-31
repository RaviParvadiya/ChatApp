import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const { io } = require("socket.io-client");
const socket = io("http://192.168.29.212:3000/");

const Home = () => {
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");

  // const navigate = useNavigate();

  socket.on("connect", () => {
    console.log(socket.id);
  });

  // listen for room updates from the server
  socket.on("allRooms", (data) => {
    console.log(data);
    setRooms(data.rooms);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("", { roomName: selectedRoom });
  };

  const createRoom = async (e) => {
    e.preventDefault();
    const username = window.localStorage.getItem("username");
    // Emit an event to the server to create the room
    socket.emit("joinRoom", username, room);
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
        <div></div>
        <form onSubmit={handleSubmit}>
          <label>
            Select a Room:
            <select></select>
          </label>
          <button type="submit">Join Room</button>
        </form>
      </div>
    </div>
  );
};

export default Home;

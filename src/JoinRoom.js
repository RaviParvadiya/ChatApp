import React, { useState, useEffect } from "react";
// import socketIOClient from "socket.io-client";

// const ENDPOINT = "";
// const socket = socketIOClient(ENDPOINT);

const { io } = require("socket.io-client");
const socket = io("http://192.168.29.212:3000/");

const JoinRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");

  useEffect(() => {
    // listen for room updates from the server
    socket.on("allRooms", (data) => {
      setRooms(data.rooms);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("", { roomName: selectedRoom });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select a Room:
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          {rooms.map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Join Room</button>
    </form>
  );
};

export default JoinRoom;

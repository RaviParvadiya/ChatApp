import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const { io } = require("socket.io-client");
const socket = io("http://192.168.29.212:3000/");

const Home = () => {
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");

  socket.on("connect", () => {
    console.log(socket.id);
  });

  useEffect(() => {
    // listen for room updates from the server
    socket.on("allRooms", (data) => {
      console.log(data);
      setRooms(data);
    });
    return () => {
      socket.off("allRooms");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("", { roomName: selectedRoom });
  };

  const token = window.localStorage.getItem("token");

  const decoded = jwt_decode(token);

  const createRoom = async (e) => {
    e.preventDefault();
    // Emit an event to the server to create the room
    socket.emit("joinRoom", decoded.username, room);
    // navigate("chat-room");
    setRoom("");
  };

  return (
    <div className="main-home">
      <div className="home-head">
      <p className="">Create Room</p>
      </div>
      
      <div className="create-room-div">
      <form onSubmit={createRoom}>
        <div className="room-name-txt">
        <label>
          Room Name:
          <input
            type="text"
            value={room}
            required
            onChange={(e) => setRoom(e.target.value)}
          />
        </label>
        </div>
        
        
        <button type="submit">Create Room</button>
      </form>
      </div>

      <div className="join-room-box">

      <div className="home-head">
      <p className="">Join Room</p>
      </div>

      <div className="join-room-div">
        <form onSubmit={handleSubmit}>

          <div className="select-room-drp-dwn">
          <label>
            Select a Room:
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
            >
              {rooms.map((room) => (
                <option key={room.id} value={room.roomName}>
                  {room.roomName}
                </option>
              ))}
            </select>
          </label>
          </div>
          
          <button type="submit">Join Room</button>
        </form>
      </div>
      
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import './chatRoom.css'

const { io } = require("socket.io-client");
const socket = io("http://192.168.29.212:3000/");

const ChatRoom = () => {
  const [msgs, setMsgs] = useState([]);
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("", (msg) => {
      setMsgs((msgs) => [...msgs, msg]);
    });

    socket.on("user-connected", (user) => {
      setUsers((users) => [...users, user]);
    });

    socket.on("user-disconnected", (user) => {
      setUsers((users) => users.filter((u) => u !== user));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("", input);
    setInput("");
  };

  return (
    <div className="chat-room">
      <div className="header">
        <h2>Chat Room</h2>
        <h3>Connected Users</h3>
        <ul>
          {users.map(user => (
            <li key={user}>{user}</li>
          ))}
        </ul>
      </div>
      <div className="messages">
        <ul>
          {msgs.map(msg => (
            <li key={msg}>{msg}</li>
          ))}
        </ul>
      </div>
      <form className="input-form" onSubmit={handleSubmit}>
        <input value={input} onChange={e => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;

import React, { useEffect, useState } from "react";
const { io } = require("socket.io-client");
const socket = io("http://192.168.29.212:3000/");

const ChatRoom = (props) => {
  const [msgs, setMsgs] = useState([]);
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");

  const room = window.localStorage.getItem("room");
  const username = window.localStorage.getItem("username");

  socket.on("allUser", (data) => {
    console.log(data);
    setUsers(data);
  });

  useEffect(() => {
    socket.emit("joinRoom", username, room);
  });

  useEffect(() => {
    socket.on("new message", (msg) => {
      setMsgs([...msgs, msg]);
    });
  }, [msgs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("new message", room, input, username, () => setMsgs(""));
    setInput("");
  };

  return (
    <div className="chat-room">
      <div>Chatroom</div>
      <form className="input-form" onSubmit={handleSubmit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;

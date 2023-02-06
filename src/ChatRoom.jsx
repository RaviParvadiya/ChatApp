import React, { useEffect, useState } from "react";
const { io } = require("socket.io-client");
const socket = io("https://chat-server-vo3q.onrender.com/");

const ChatRoom = () => {
  const [msgs, setMsgs] = useState([]);
  const [users, setUsers] = useState();
  const [input, setInput] = useState("");

  const room = window.localStorage.getItem("room");
  const username = window.localStorage.getItem("username");

  socket.emit("joinRoom", username, room);

  socket.on("message", (msg) => {
    const messageContainer = document.getElementById("wlc");
    messageContainer.innerHTML = msg.username + ': ' + msg.text;
  });

  socket.on("info", (msg) => {
    const messageContainer = document.getElementById("joinedMessage");
    messageContainer.innerHTML = msg.username + " " + msg.text;
  });

  socket.emit("getroominfo", room);

  socket.on("allUser", (data) => {
    const names = data.map((user) => user.username);
    // console.log('allUser:', names);
  });

  const sendMessage = (e) => {
    e.preventDefault();
    if (input) {
      socket.emit("new message", room, input, username);
    }
  };
  
    socket.on("new message", (data) => {
      console.log("Received message:", data.message, "from", data.name);
    });
 

  return (
    <div className="chat-room">
      <div id="wlc"></div>
      <div id="joinedMessage"></div>
      <form className="input-form" onChange={sendMessage}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
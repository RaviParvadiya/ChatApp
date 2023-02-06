import React, { useEffect, useState } from "react";
const { io } = require("socket.io-client");
const socket = io("http://192.168.29.18:5000/");

const ChatRoom = () => {
  const [msgs, setMsgs] = useState([]);
  const [users, setUsers] = useState();
  const [input, setInput] = useState("");

  const room = window.localStorage.getItem("room");
  const username = window.localStorage.getItem("username");

  useEffect(()=>{

  socket.emit("joinRoom", username, room);

  socket.on("message", (msg) => {
    const messageContainer = document.getElementById("wlc");
    messageContainer.innerHTML = msg.username + ": " + msg.text;
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

  socket.on("new message", (data) => {
    console.log("Received message:", data.message, "from", data.name);
    setMsgs((prevMsgs) => [...prevMsgs, data]);
  });

  return () => {
    socket.off("new message");
  };
})

  const sendMessage = (e) => {
    e.preventDefault();
    // socket.emit("new message", {room, input, username});
    socket.emit("new message", room, input, username);
  };

  return (
    <div className="chat-room">
      <div id="wlc"></div>
      <div id="joinedMessage"></div>
      <form className="input-form" onSubmit={sendMessage}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
      {msgs.map((m) => (
        <div>
          <p>{m.message}</p>
          <p>sent by {m.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatRoom;
